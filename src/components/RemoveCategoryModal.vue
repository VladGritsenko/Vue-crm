<template>
  <a-modal
      title="Remove category"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
  >
    <div class="title">Do you really want to remove a category {{ this.category.name }}?</div>
  </a-modal>
</template>

<script>
  export default {
    name: 'RemoveCategoryModal',
    props: {
      visible: Boolean,
      category: Object,
      handleCancel: Function
    },
    methods: {
      async handleOk() {
        await this.$store.dispatch('removeCategory', this.category.id);
        this.handleCancel();
      }
    },
  }
</script>

<style scoped lang="scss">
  .title {
    text-align: center;
  }
</style>
