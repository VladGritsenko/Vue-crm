<template>
  <div class="layoutWrapper">
    <div class="layoutContainer">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EmptyLayout'
  }
</script>

<style scoped lang="scss">
  .layoutWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }

  .layoutContainer {
    height: 60vh;
    width: 50vw;
    max-width: 800px;
    max-height: 600px;
    display: flex;
    justify-content: center;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  }
</style>
