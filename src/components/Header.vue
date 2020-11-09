<template>
  <header class="headerContainer">
    <a-modal v-model="this.isLogout" title="Log Out" @ok="handleOk" @cancel="handleCancel">
      <p class="logoutQue">Do you really want to log out?</p>
    </a-modal>
    <span class="time">{{ this.date }}</span>
    <a-dropdown :trigger="['click']" class="dropdown">
      <a-space>
        <span>{{ username }}</span>
        <a-icon type="down" />
      </a-space>
      <a-menu slot="overlay" class="dropdownMenu">
        <a-menu-item key="2" @click="goToProfile" class="dropdownItem">
          <a-icon type="profile" />
          Profile
        </a-menu-item>
        <a-menu-item key="1" @click="handleLogout" class="dropdownItem">
          <a-icon type="logout" />
          Log out
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </header>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'Header',
    data: () => ({
      interval: null,
      date: null,
      isLogout: false,
    }),
    computed: {
      username() {
        return this.$store.getters.userInfo.name;
      }
    },
    methods: {
      async handleOk() {
        await this.$store.commit('clearUserInfo');
        this.isLogout = false;
        return this.$router.push('/login');
      },
      handleCancel() {
        this.isLogout = false;
      },
      goToProfile() {
        return this.$router.push('/profile');
      },
      handleLogout() {
        return this.isLogout = true;
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        this.date = moment(Date.now()).format('DD.MM.YYYY H:mm:ss');
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.interval);
    }
  }
</script>

<style scoped lang="scss">
  .headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    height: 70px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  }

  .time {
    color: #0e3366;
  }

  .dropdown {
    cursor: pointer;
    color: #0e3366;
  }

  .dropdownMenu {
    margin-top: 25px;
    min-width: 150px;
  }

  .dropdownItem {
    color: #0e3366;
  }

  .logoutQue {
    text-align: center;
  }
</style>
