<template>
  <a-form :form="form" @submit.prevent="handleSubmit" class="formContainer">
    <h2 class="title">Registration</h2>
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
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item label="Username" required>
      <a-input
          placeholder="Enter your username"
          v-decorator="[
        'username',
        {
          rules: [
            { required: true, message: 'Please input your username!' },
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
                 { validator: validateToNextPassword },
               ]
              }
           ]"
          type="password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item label="Confirm Password" required>
      <a-input
          placeholder="Enter your password"
          v-decorator="[
            'confirmPassWord',
             { rules: [
                 { required: true, message: 'Please input your password!' },
                 { validator: compareToFirstPassword },
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
          Sign Up
        </a-button>
        <div>
          or
          <router-link to="/login">
            Sign In
          </router-link>
        </div>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script>
  export default {
    name: 'Registration',
    metaInfo: {
      title: 'Registration | Grytsenko CRM'
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'registration' });
    },
    data: () => ({
    }),
    methods: {
      handleSubmit() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            await this.$store.dispatch('registration', values) && await this.$router.push('/');
          }
        });
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      },
      validateToNextPassword(rule, value, callback) {
        const form = this.form;
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      },
    }
  }
</script>

<style lang="scss">
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
