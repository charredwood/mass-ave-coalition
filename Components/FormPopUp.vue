<template>
  <div v-if="isFormVisible">
    <div class="formBox">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        label-position="left"
        status-icon
      >
        <el-form-item label="Event Name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Event Year" prop="year">
          <el-input v-model="ruleForm.year" />
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="ruleForm.address" type="textarea" />
        </el-form-item>
        <el-form-item label="Description" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="Source" prop="src">
          <el-input v-model="ruleForm.src" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Create a Pin
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Clear</el-button>
        </el-form-item>
        <span style="color: gray">
          <li>To close this form, click any random point on the map.</li>
          <li>
            Click "Add Pins" one more time to stop creating pins and navigate
            the map.
          </li>
          <li>
            During the beta testing, please avoid creating a new pin on the
            exact same location of existing pins.
          </li>
        </span>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'element-plus/dist/index.css'
import { reactive, ref, defineProps, defineEmits } from 'vue'
import axios from 'axios'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import { useDashboardUIStore } from '~/stores/dashboardUI'
import { useNuxtApp } from '#app'

type RuleForm = {
  name: string
  year: string
  address: string
  desc: string
  src: string
  longitude: string
  latitude: string
}

const isFormVisible = ref(true)
const ruleFormRef = ref<InstanceType<typeof ElForm>>()

// Read the coordinates of the clicked location from Map.vue
const props = defineProps({
  locationCoordinates: {
    type: Object,
    default: () => ({}),
  },
})
const ruleForm = reactive<RuleForm>({
  name: '',
  year: '',
  address: '',
  desc: '',
  src: '',
  // prefill the coordinates of the clicked location so the users don't have to input them manually
  longitude: props.locationCoordinates.longitude || '',
  latitude: props.locationCoordinates.latitude || '',
})

const dashboardUIStore = useDashboardUIStore()
const emit = defineEmits(['updateMap', 'closeForm'])

const rules = reactive({
  name: [
    { required: true, message: 'Event name required', trigger: 'blur' },
    {
      max: 120,
      message: 'The maximum length is 120 characters.',
      trigger: 'blur',
    },
  ],
  year: [
    {
      required: true,
      message: 'Event year required (Format: YYYY)',
      trigger: 'blur',
    },
    { min: 4, max: 12, message: '(Format: YYYY)', trigger: 'blur' },
  ],
  address: [
    {
      required: true,
      message: '(Format: 123 Main St, City, State, Zip Code)',
      trigger: 'blur',
    },
  ],
  desc: [
    { required: true, message: 'Event description required', trigger: 'blur' },
    {
      min: 10,
      message: 'The minimum length is 10 characters.',
      trigger: 'blur',
    },
  ],
  src: [
    {
      required: true,
      message: 'Source required (Type "Unknown" if unclear)',
      trigger: 'blur',
    },
    {
      max: 80,
      message: 'The maximum length is 80 characters.',
      trigger: 'blur',
    },
  ],
  longitude: [
    { required: true, message: 'Longitude required', trigger: 'blur' },
  ],
  latitude: [{ required: true, message: 'Latitude required', trigger: 'blur' }],
})

const submitForm = async (formEl: InstanceType<typeof ElForm> | null) => {
  if (!formEl) return
  console.log('submitForm called')
  try {
    await formEl.validate(async (valid: boolean) => {
      console.log('Form validation result:', valid)
      if (valid) {
        const functionUrl = '/api/connectSheet'

        try {
          console.log('Sending data to API:', ruleForm)
          const response = await axios.post(functionUrl, ruleForm)
          console.log('API response received:', response.data)
          ElMessage.success('Pin created successfully!')

          const newMarkerData = {
            YEAR: ruleForm.year,
            EVENT_NAME: ruleForm.name,
            LATITUDE: parseFloat(ruleForm.latitude),
            LONGITUDE: parseFloat(ruleForm.longitude),
            DESCRIPTION: ruleForm.desc,
            ADDRESS: ruleForm.address,
            SOURCE_NAME: ruleForm.src,
          }
          console.log('Emitting updateMap event with data:', newMarkerData)
          emit('updateMap', newMarkerData)

          resetForm(formEl)
          dashboardUIStore.toggleEditMode()

          emit('closeForm')
        } catch (error: any) {
          console.error('API submission error:', error)
          ElMessage.error(
            `Failed to create pin: ${error.message || 'Unknown error'}`
          )
        }
      } else {
        console.log('Form validation failed')
        ElMessage.warning('Please fill in all required fields correctly.')
      }
    })
  } catch (error: any) {
    console.error('Form submission error:', error)
    ElMessage.error(
      `An unexpected error occurred: ${error.message || 'Unknown error'}`
    )
  }
}

const resetForm = (formEl: InstanceType<typeof ElForm> | null) => {
  if (!formEl) return
  formEl.resetFields()
  console.log(ruleForm)
}
</script>

<style scoped>
.formBox {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 32%;
  top: 80px;
  height: auto;
  width: 35%;
  padding: 20px;
  font-size: 14px;
  background: white;
  z-index: 20;
  border-radius: 15px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
  max-height: auto;
  overflow: scroll;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
