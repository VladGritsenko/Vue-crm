<template>
  <a-modal
      title="Add category"
      :footer="null"
      :visible="visible"
      @cancel="handleCancel"
  >
    <a-form
        :form="form"
        @submit.prevent="handleSubmit"
        class="modalContainer"
    >
      <a-form-item label="Category Name" required>
        <a-input
            placeholder="Enter your category name"
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your category name!',
                  },
                ],
              },
            ]"
        >
          <a-icon slot="prefix" type="unordered-list" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="Limit" required>
        <a-input
            placeholder="Enter your limit"
            v-decorator="[
              'limit',
               {
                 rules: [
                   { required: true, message: 'Please input your category name!' },
                 ]
               }
            ]"
            type="number"
            min="100"
            max="100000"
        >
          <a-icon slot="prefix" type="dollar" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item :style="{marginBottom: 0}">
        <a-space class="buttonContainer">
          <a-button
              html-type="button"
              class="button"
              @click="handleCancel"
          >
            Cancel
          </a-button>
          <a-button
              type="primary"
              html-type="submit"
              class="button"
          >
            Add
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  export default {
    name: 'AddCategoryModal',
    data() {
      return {
        form: this.$form.createForm(this, { name: "addCategories" }),
      };
    },
    props: {
      visible: Boolean,
      handleCancel: Function
    },
    methods: {
      handleSubmit() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            const dispatchData = {
              ...values
            };

            await this.$store.dispatch('createCategory', dispatchData);
            this.handleCancel();
            this.form.resetFields();
          }
        });
      }
    },
  }
</script>

<style scoped lang="scss">
  .modalContainer {
    padding: 0 50px;
  }

  .buttonContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  .button {
    min-width: 100px;
  }
</style>
