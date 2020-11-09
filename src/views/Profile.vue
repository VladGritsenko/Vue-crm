<template>
  <div class="pageWrapper">
    <div class="titleContainer">
      <h2 class="title">Profile</h2>
    </div>
    <a-spin :spinning="this.$store.getters.isLoading">
      <div class="pageContainer">
        <a-form
            :form="form"
            @submit.prevent="handleSubmit"
            class="modalContainer"
        >
          <a-form-item label="Name" required>
            <a-input
                placeholder="Enter your name"
                v-decorator="[
              'name',
              {
                initialValue: this.$store.getters.userInfo.name,
                rules: [
                  { required: true, message: 'Please input your name!' },
                ],
              },
            ]"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="Email" required>
            <a-input
                :disabled="true"
                placeholder="Enter your email"
                v-decorator="[
                  'email',
                  {
                    initialValue: this.$store.getters.userInfo.email,
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid email!',
                      },
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ],
                  },
                ]"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="Phone">
            <a-input
                placeholder="Enter your phone"
                v-decorator="['phone', { initialValue: this.$store.getters.userInfo.phone }]"
                type="number"
            >
              <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="City">
            <a-input
                placeholder="Enter your city"
                v-decorator="['city', { initialValue: this.$store.getters.userInfo.city }]"
            >
              <a-icon slot="prefix" type="home" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item :style="{marginBottom: 0}">
            <a-space class="buttonContainer">
              <a-button
                  type="primary"
                  html-type="submit"
                  class="button"
              >
                Save
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </a-spin>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    metaInfo: {
      title: 'Profile | Grytsenko CRM'
    },
    data() {
      return {
        form: this.$form.createForm(this, { name: "profile" }),
      }
    },
    mounted() {
      this.$store.dispatch('getUserInfo');
    },
    methods: {
      handleSubmit() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            this.$store.dispatch('updateUserInfo', values);
          }
        })
      }
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
