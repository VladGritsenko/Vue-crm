<template>
  <div class="pageContainer">
    <div class="currencyContainer">
      <h2 class="title">Bill in currencies</h2>
      <div class="container">
        <a-table :columns="billColumns" :data-source="billList" :pagination="false"/>
      </div>
    </div>
    <div class="currencyListContainer">
      <h2 class="title">Currencies rates</h2>
      <div class="container">
        <a-table :columns="columns" :data-source="tableData" :pagination="false"/>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'BankAccount',
    metaInfo: {
      title: 'Bill | Grytsenko CRM'
    },
    data: () => ({
      currencyList: {},
      columns: [
        {
          title: 'Currency',
          dataIndex: 'currency',
          key: 'currency',
        },
        {
          title: 'Course',
          dataIndex: 'course',
          key: 'course',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        }
      ],
      billColumns: [
        {
          title: 'Currency',
          dataIndex: 'currency',
          key: 'currency',
        },
        {
          title: 'Sum',
          dataIndex: 'sum',
          key: 'sum',
        },
      ],
    }),
    async mounted() {
      const currencyList = await this.$store.dispatch('getCurrency');
      this.currencyList = currencyList?.rates;
    },
    computed: {
      billList() {
        const bill = this.$store.getters.userInfo.bill || 0;
        const entriesData =  Object.entries({
          UAH: new Intl.NumberFormat('uk-UK', { style: 'currency', currency: 'UAH' })
          .format(bill.toFixed(2)),
          USD: new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' })
          .format((this.currencyList['USD'] / this.currencyList['UAH'] * bill).toFixed(2)),
          EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
            .format((1 / this.currencyList['UAH'] * bill).toFixed(2)),
          RUB: new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })
            .format((this.currencyList['RUB'] / this.currencyList['UAH'] * bill).toFixed(2)),
        });

        return entriesData.map(item => ({
          currency: item[0],
          sum: item[1],
        }))
      },
      tableData() {
        const entriesData = Object.entries({
          EUR: this.currencyList['UAH'],
          RUB: this.currencyList['UAH'] / this.currencyList['RUB'],
          USD: this.currencyList['UAH'] / this.currencyList['USD'],
        });

        return entriesData.map(item => ({
          currency: item[0],
          course: item[1].toFixed(2),
          date: moment(Date.now()).format('DD.MM.YYYY')
        }))
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
  .pageContainer {
    width: 100%;
    display: grid;
    grid-template-columns: 0.4fr 0.6fr;
    grid-gap: 50px;
  }

  .currencyContainer {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  }

  .currencyListContainer {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  }

  .title {
    padding-top: 10px;
    font-size: 22px;
    color: #0e3366;
    text-indent: 30px;
    text-align: left;
    border-bottom: 1px solid lightgrey;
  }

  .container {
    padding: 10px 30px 30px;
  }
</style>
