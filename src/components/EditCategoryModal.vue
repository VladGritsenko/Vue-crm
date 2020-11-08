<template>
  <a-modal
      title="Edit category"
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
              'categoryName',
              {
                initialValue: this.category.name,
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
                 initialValue: this.category.limit,
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
            Edit
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  export default {
    name: 'EditCategoryModal',
    data() {
      return {
        form: this.$form.createForm(this, { name: "categories" }),
      };
    },
    props: {
      visible: Boolean,
      category: Object,
      handleCancel: Function
    },
    methods: {
      handleSubmit() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            const dispatchData = {
              id: this.category.id,
              name: values.categoryName,
              limit: values.limit
            };

            await this.$store.dispatch('updateCategory', dispatchData);
            this.handleCancel();
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
