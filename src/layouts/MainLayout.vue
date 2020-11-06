<template>
 <div class="layoutContainer">
   <Header />
   <div class="contentContainer">
     <Sidebar />
     <div class="routeContainer">
       <router-view />
       <router-link
           to="/newEntry"
           class="addEntryLink"
           active-class="addEntryLinkHide"
       >
         <a-icon type="plus" class="buttonIcon"/>
       </router-link>
     </div>
   </div>
 </div>
</template>

<script>
  import Sidebar from '../components/Sidebar';
  import Header from '../components/Header';

  export default {
    name: 'MainLayout',
    components: {
      Sidebar, Header
    }
  }
</script>

<style scoped lang="scss">
  .layoutContainer {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .contentContainer {
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
  }

  .routeContainer {
    position: relative;
    overflow-y: scroll;
    padding: 50px;
    height: 100%;
    width: 100%;
  }

  .addEntryLink {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 50px;
    bottom: 50px;
    border-radius: 50%;
    background-color: #0e3366;
    color: #fff;
    height: 50px;
    width: 50px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: lighten(#0e3366, 10%);
    }
  }

  .addEntryLinkHide {
    display: none;
  }

  .buttonIcon {
    font-size: 28px;
  }
</style>
