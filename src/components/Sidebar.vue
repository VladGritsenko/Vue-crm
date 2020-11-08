<template>
  <aside class="sidebarContainer">
    <ul>
      <router-link
          v-for="item in sidebarData"
          :key="item.id"
          tag="li"
          :to="item.route"
          class="menuItem"
          active-class="activeMenuItem"
          :exact="item.exact"
      >
        <a-icon :type="item.icon" class="itemIcon"/>
        <div class="itemName">{{ item.name }}</div>
      </router-link>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'Sidebar',
    data: () => ({
      sidebarData: [
        {id: 0, name: 'Bank Account', route: '/', icon: 'dollar', exact: true},
        {id: 1, name: 'History', route: '/history', icon: 'history', exact: false},
        {id: 2, name: 'Planning', route: '/planning', icon: 'line-chart', exact: false},
        {id: 3, name: 'New Entry', route: '/newEntry', icon: 'file', exact: false},
        {id: 4, name: 'Categories', route: '/categories', icon: 'unordered-list', exact: false},
      ]
    }),
  }
</script>

<style scoped lang="scss">
  .sidebarContainer {
    height: 100%;
    width: 280px;
    padding: 30px 0;
    background-color: #0e3366;
  }

  .menuItem {
    display: flex;
    align-items: center;
    text-decoration: none;
    list-style: none;
    width: 100%;
    height: 42px;
    padding: 0 30px;
    color: #328fdd;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover {
      color: #f7891e;
    }
  }

  .activeMenuItem {
    color: #fff;
  }

  .itemIcon {
    padding-right: 20px;
    font-size: 16px;
  }

  .itemName {
    font-size: 16px;
  }
</style>
