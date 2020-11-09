<template>
  <a-spin :spinning="this.$store.getters.recordsIsLoading">
    <div class="pageWrapper">
      <div class="titleContainer">
        <h2 class="title">History</h2>
      </div>
      <div class="pageContainer">
        <a-table
            :columns="historyColumns"
            :data-source="this.$store.getters.recordsList"
        >
          <template slot="type" slot-scope="record">
            <span
                :style="{backgroundColor: record.type === 'Outcome' ? '#cd2a22' : '#0e3366'}"
                class="typeLabel"
            >
              {{ record.type }}
            </span>
          </template>
          <template slot="sum" slot-scope="record">
              {{ new Intl.NumberFormat('uk-UK', { style: 'currency', currency: 'UAH' })
            .format(Number(record.sum).toFixed(2)) }}
          </template>
        </a-table>
      </div>
    </div>
  </a-spin>
</template>

<script>
export default {
  name: 'History',
  metaInfo: {
    title: 'History | Grytsenko CRM'
  },
  data() {
    return {
      historyColumns: [
        {
          title: '№',
          dataIndex: 'index',
          key: 'index',
        },
        {
          title: 'Category',
          dataIndex: 'categoryName',
          key: 'categoryName',
        },
        {
          title: 'Amount',
          key: 'sum',
          scopedSlots: { customRender: 'sum' },
        },
        {
          title: 'Type',
          key: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
      ]
    }
  },
  async mounted() {
    await this.$store.dispatch('getRecords');
  },
  components: {
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

  .typeLabel {
    color: #fff;
    border-radius: 5px;
    padding: 4px;
  }
</style>
