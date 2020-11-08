<template>
  <a-form :form="form" @submit.prevent="handleSubmit" class="formContainer">
    <h2 class="title">Login</h2>
    <a-form-item label="Email" required>
      <a-input
          placeholder="Enter your email"
          v-decorator="[
        'email',
        {
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
    <a-form-item label="Password" required>
      <a-input
          placeholder="Enter your password"
          v-decorator="[
            'password',
             { rules: [
                 { required: true, message: 'Please input your password!' },
                 { min: 6, message: 'Username must be minimum 6 characters.' },
               ]
              }
           ]"
          type="password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-space class="buttonContainer">
        <div/>
        <a-button type="primary" html-type="submit" class="button">
          Sign In
        </a-button>
        <div>
          or
          <router-link to="/registration">
            Sign Up
          </router-link>
        </div>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script>
  export default {
    name: 'Login',
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'login' });
    },
    data: () => ({
    }),
    methods: {
      handleSubmit() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            await this.$store.dispatch('login', values) && await this.$router.push('/');
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .formContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 400px;
  }

  .title {
    color: #0e3366;
    font-size: 35px;
  }

  .buttonContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    margin-top: 30px;
    width: 100%;

    .button {
      width: 220px;
    }
  }
</style>
