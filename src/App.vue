<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  import EmptyLayout from './layouts/EmptyLayout';
  import MainLayout from './layouts/MainLayout';

  export default {
    name: "App",
    components: {
      EmptyLayout, MainLayout
    },
    computed: {
      layout() {
        return this.$route.meta.layout + '-layout';
      }
    }
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

ul {
  margin: 0;
  padding: 0;
}

.ant-row.ant-form-item {
  text-align: left;
}
</style>
