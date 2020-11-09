<template>
  <a-spin :spinning="this.$store.getters.isLoading">
    <div class="pageWrapper">
      <EditCategoryModal
          :visible="editCategoryModalIsVisible"
          :handleCancel="handleCloseEditCategoryModal"
          :category="activeCategory"
      />
      <AddCategoryModal
          :visible="addCategoryModalIsVisible"
          :handleCancel="handleCloseAddCategoryModal"
      />
      <RemoveCategoryModal
          :visible="deleteCategoryModalIsVisible"
          :handleCancel="handleCloseRemoveCategoryModal"
          :category="activeCategory"
      />
      <div class="titleContainer">
        <h2 class="title">Category Management</h2>
        <a-tooltip title="Add category">
          <a-icon type="plus" class="icon" @click="handleOpenAddCategoryModal"/>
        </a-tooltip>
      </div>
      <div class="pageContainer">
        <a-table
            :columns="categoryColumns"
            :data-source="this.$store.getters.categories"
            :pagination="false"
        >
          <template slot="actions" slot-scope="record">
            <a-space>
              <a-tooltip title="Edit">
                <a-icon
                    type="edit"
                    class="icon"
                    @click="() => handleOpenEditCategoryModal(record)"
                />
              </a-tooltip>
              <a-tooltip title="Delete">
                <a-icon
                    type="delete"
                    class="icon"
                    :style="{backgroundColor: '#cd2a22'}"
                    @click="() => handleOpenRemoveCategoryModal(record)"
                />
              </a-tooltip>
            </a-space>
          </template>
        </a-table>
      </div>
    </div>
  </a-spin>
</template>

<script>
  import EditCategoryModal from '../components/EditCategoryModal';
  import AddCategoryModal from '../components/AddCategoryModal';
  import RemoveCategoryModal from '../components/RemoveCategoryModal';

  export default {
    name: 'Categories',
    metaInfo: {
      title: 'Categories | Grytsenko CRM'
    },
    data: () => ({
      addCategoryModalIsVisible: false,
      editCategoryModalIsVisible: false,
      deleteCategoryModalIsVisible: false,
      activeCategory: {},
      categoryData: [
        {id: 'sdfsdf1', index: 1, name: 'Test 1', limit: 1000, date: '10.12.2020 10:00'}
      ],
      categoryColumns: [
        {
          title: '№',
          dataIndex: 'index',
          key: 'index',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Limit',
          dataIndex: 'limit',
          key: 'limit',
        },
        {
          title: 'Created date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Actions',
          key: 'actions',
          scopedSlots: { customRender: 'actions' }
        }
      ]
    }),
    methods: {
      handleOpenAddCategoryModal() {
        this.addCategoryModalIsVisible = true;
      },
      handleCloseAddCategoryModal() {
        this.addCategoryModalIsVisible = false;
      },
      handleOpenEditCategoryModal(category) {
        this.editCategoryModalIsVisible = true;
        this.activeCategory = category;
      },
      handleCloseEditCategoryModal() {
        this.editCategoryModalIsVisible = false;
        this.activeCategory = {};
      },
      handleOpenRemoveCategoryModal(category) {
        this.deleteCategoryModalIsVisible = true;
        this.activeCategory = category;
      },
      handleCloseRemoveCategoryModal() {
        this.deleteCategoryModalIsVisible = false;
        this.activeCategory = {};
      }
    },
    async mounted() {
      await this.$store.dispatch('getCategories');
    },
    components: {
      RemoveCategoryModal,
      EditCategoryModal, AddCategoryModal
    }
  }
</script>

<style scoped lang="scss">
  .pageWrapper {
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  }

  .pageContainer {
    padding: 10px 30px 30px;
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
</style>
