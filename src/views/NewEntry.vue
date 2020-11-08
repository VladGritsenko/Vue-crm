<template>
  <div class="pageWrapper">
    <div class="titleContainer">
      <h2 class="title">New Entry</h2>
    </div>
    <a-spin :spinning="this.$store.getters.isLoading">
      <div class="pageContainer">
        <a-form
            v-if="this.$store.getters.categories.length"
            :form="form"
            @submit.prevent="handleSubmit"
            class="modalContainer"
        >
          <a-form-item label="Category" required>
            <a-select
                placeholder="Please select category name"
                v-decorator="[
                'category',
                { rules: [{ required: true, message: 'Enter category name' }] },
              ]"
            >
              <a-select-option
                  v-for="category in this.$store.getters.categories"
                  :key="category.id"
                  :value="category.id"
              >
                {{ category.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-radio-group
                v-decorator="[
                  'type',
                   { initialValue: 'Income' }
              ]"
                default-value="Income"
            >
              <a-radio value="Income">
                Income
              </a-radio>
              <a-radio value="Outcome">
                Outcome
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Sum" required>
            <a-input
                placeholder="Enter your sum"
                v-decorator="[
              'sum',
              {
                rules: [
                  { required: true, message: 'Please input your category name!' },
                ],
              },
            ]"
                type="number"
                min="1"
            >
            </a-input>
          </a-form-item>
          <a-form-item label="Description" required>
            <a-input
                placeholder="Enter your description"
                v-decorator="[
              'description',
               {
                 rules: [
                   { required: true, message: 'Please input your description' },
                 ]
               }
            ]"
            >
            </a-input>
          </a-form-item>
          <a-form-item :style="{marginBottom: 0}">
            <a-space class="buttonContainer">
              <a-button
                  type="primary"
                  html-type="submit"
                  class="button"
              >
                Record
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
        <div v-else>
          Categories list is empty.
          <router-link to="/categories">Add category</router-link>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
  import { message } from 'ant-design-vue';

  export default {
    name: 'NewEntry',
    async mounted() {
      await this.$store.dispatch('getCategories');
      await this.$store.dispatch('getUserInfo');
    },
    data() {
      return {
        form: this.$form.createForm(this, { name: "newEntry" }),
        categoryList: []
      }
    },
    methods: {
      handleSubmit() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            try {
              if (values.type === "Income" || this.$store.getters.userInfo.bill - values.sum > 0) {
                const currentBill = this.$store.getters.userInfo.bill;
                const newBill = values.type === 'Income'
                    ? Number(currentBill) + Number(values.sum)
                    : Number(currentBill) - Number(values.sum);

                await this.$store.dispatch('createRecord', {record: values, bill: newBill});
                await this.$store.dispatch('getUserInfo');
                await this.form.resetFields();
              } else {
                message.error('You do not have enough money');
              }
            } catch (e) {
              console.error(e);
            }
          }
        });
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
  .pageWrapper {
    width: 100%;
    max-width: 700px;
    min-height: 500px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  }

  .pageContainer {
    padding: 10px 30px 30px;
    max-width: 500px;
    width: 100%;
    line-height: 410px;
    margin: 0 auto;
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

  .buttonContainer {
    display: flex;
    justify-content: center;

    .button {
      width: 150px;
    }
  }
</style>
