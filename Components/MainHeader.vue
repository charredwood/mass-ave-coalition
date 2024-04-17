<template>
  <header class="header">
    <h1>Collective History</h1>
    <nav>
      <a href="/about">About</a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
<<<<<<< Updated upstream
  justify-content: space-between;
  /* This ensures the children are spaced out evenly */
  background-color: #25A69A;
}

.header .left,
.header .right,
.header .title-container {
  flex: 1;
  /* Each section takes up equal space */
  display: flex;
  justify-content: center;
  /* This centers the content of each section */
}

.header .left {
  justify-content: flex-start;
  /* Aligns the search bar to the left */
}

.header .right {
  justify-content: flex-end;
  /* Aligns the navigation to the right */
}

.search-bar {
  width: 350px;
  height: 40px;

  border: 1px solid #d6d6d6;
  border-radius: 10px;
  background-color: #f2f2f2;
  padding: 5px;
=======
  background-color: #25a69a;
>>>>>>> Stashed changes
}

.header h1 {
  font-size: 40px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
}

.header nav a {
  color: black;
  font-size: 20px;
  margin-right: 20px;
}
</style>
