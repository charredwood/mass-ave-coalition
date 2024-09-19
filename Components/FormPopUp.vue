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
          <li>Click "Add Pins" one more time to stop creating pins and navigate the map.</li>
          <li>During the beta testing, please avoid creating a new pin on the exact same location of existing pins.</li>
        </span>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'element-plus/dist/index.css'
import { reactive, ref, defineProps } from 'vue'
import axios from 'axios'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'

interface RuleForm {
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
    default: () => ({})
  }
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

const rules = reactive({
  name: [
    { required: true, message: 'Event name required', trigger: 'blur' },
    { max: 100, message: 'The maximum length is 120 characters.', trigger: 'blur' },
  ],
  year: [
    { required: true, message: 'Event year required (Format: YYYY)', trigger: 'blur' },
    { min: 4, max: 12, message: '(Format: YYYY)', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '(Format: 123 Main St, City, State, Zip Code)', trigger: 'blur' },
  ],
  desc: [
    { required: true, message: 'Event description required', trigger: 'blur' },
    { min: 100, message: 'The minimum length is 100 characters.', trigger: 'blur' },
  ],
  src: [
    { required: true, message: 'Source required (Type "Unknown" if unclear)', trigger: 'blur' },
    { max: 80, message: 'The maximum length is 80 characters.', trigger: 'blur' },
  ],
  longitude: [
    { required: true, message: 'Longitude required', trigger: 'blur' },
  ],
  latitude: [
    { required: true, message: 'Latitude required', trigger: 'blur' },
  ],
})

const submitForm = async (formEl) => {
  if (!formEl) return
  try {
    await formEl.validate(async (valid) => {
      if (valid) {
        const functionUrl = 'https://us-central1-collective-history-435822.cloudfunctions.net/connectSheet';
        
        // Send data to the Google Cloud Function
        await axios.post(functionUrl, ruleForm);
        
        console.log('Data submitted successfully');
      } else {
        console.log('Validation Error');
      }
    })
  } catch (error) {
    console.error('Submission failed:', error);
  }
}


const resetForm = (formEl) => {
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
