<template>
  <a-spin :spinning="this.$store.getters.isLoading">
    <div class="pageWrapper">
      <div class="titleContainer">
        <h2 class="title">Planning</h2>
      </div>
      <div
          class="pageContainer"
          v-if="this.$store.getters.categories.length"
      >
        <ul>
          <li v-for="plan in planningData" :key="plan.id" class="planItem">
            <div>
              <b>{{ plan.categoryName }}: </b>
              <span>{{ plan.planTitle }}</span>
            </div>
            <a-tooltip :title="`Balance: ${plan.balance}`">
              <a-progress :percent="plan.percent" :show-info="false" :status="plan.status" />
            </a-tooltip>
          </li>
        </ul>
      </div>
      <div v-else class="empty">
        Categories list is empty.
        <router-link to="/categories">Add category</router-link>
      </div>
    </div>
  </a-spin>
</template>

<script>

  export default {
    name: 'Planning',
    metaInfo: {
      title: 'Planning | Grytsenko CRM'
    },
    data() {
      return {
        planningData: []
      }
    },
    async mounted() {
      await this.$store.dispatch('getRecords');
      await this.$store.dispatch('getCategories');

      const categories = this.$store.getters.categories;
      const records = this.$store.getters.recordsList;

      this.planningData = categories.map(item => {
        const outcome = records.filter(record => record.category === item.id)
        .filter(record => record.type === 'Outcome')
        .reduce((total, item) => +total + +item.sum, 0);

        const percent = outcome / item.limit * 100 < 100 ? outcome / item.limit * 100 : 100;
        const outcomeTitle = new Intl.NumberFormat('uk-UK', { style: 'currency', currency: 'UAH' })
          .format(outcome.toFixed(2));
        const limitTitle = new Intl.NumberFormat('uk-UK', { style: 'currency', currency: 'UAH' })
          .format(Number(item.limit).toFixed(2));

        return {
          categoryName: item.name,
          percent,
          outcome,
          limit: item.limit,
          id: `r${item.id}`,
          balance: item.limit - outcome,
          planTitle: `${outcomeTitle} / ${limitTitle}`,
          status: percent >= 100 ? 'exception' : percent >= 80 ? 'normal' : 'success'
        };
      });
    },
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

  .planItem {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0;
    list-style: none;
  }

  .empty {
    padding: 100px 0;
  }
</style>
