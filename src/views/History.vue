<template>
  <a-spin :spinning="false">
    <div class="pageWrapper">
      <div class="titleContainer">
        <h2 class="title">History</h2>
      </div>
      <div class="pageContainer">

      </div>
    </div>
  </a-spin>
</template>

<script>

export default {
  name: 'History',
  components: {
  }
}
</script>

<style scoped lang="scss">
  .pageWrapper {
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  }

  .pageContainer {
    padding: 10px 30px 30px;
  }

  .titleContainer {
    display: flex;
    padding: 10px 30px 0;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid lightgrey;

  .title {
    font-size: 22px;
    color: #0e3366;
  }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    font-size: 16px;
    border-radius: 5px;
    background-color: #0e3366;
    color: #fff;
    cursor: pointer;
  }
</style>
