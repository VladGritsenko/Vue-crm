import firebase from 'firebase/app';
import { message } from 'ant-design-vue';
import moment from 'moment';

export default {
  state: {
    isLoading: true,
    categories: []
  },
  mutations: {
    setLoader(state, boolean) {
      state.isLoading = boolean;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    editCategory(state, categories) {
      state.categories = state.categories.map(item => {
        if(item.id === categories.id) {
          return {
            ...item,
            limit: categories.limit,
            name: categories.name
          }
        }

        return item;
      });
    },
    addCategory(state, category) {
      state.categories = [
          ...state.categories,
        {
          ...category,
          index: state.categories.length + 1
        }
      ];
    },
    deleteCategory(state, id) {
      state.categories = state.categories.filter(category => category.id !== id);
    }
  },
  actions: {
    async getCategories({ commit, dispatch }) {
      try {
        const userId = await dispatch('getCurrentUserId');
        const categories = (await firebase.database().ref(`/users/${userId}/categories`).once('value')).val();
        const categoriesData = Object.keys(categories).map((key, index) => ({...categories[key], id: key, index: index + 1}));
        commit('setCategories', categoriesData);
        commit('setLoader', false);
      } catch (e) {
        commit('setLoader', false);
      }
    },
    async updateCategory({ commit, dispatch }, { limit, name, id }) {
      try {
        const userId = await dispatch('getCurrentUserId');
        await firebase.database().ref(`/users/${userId}/categories`).child(id).update({ name, limit });
        commit('editCategory', { limit, name, id });
        message.success('Category successfully edited')
      } catch (e) {
        message.error(e.message);
      }
    },
    async createCategory({ commit, dispatch }, { limit, name }) {
      try {
        const userId = await dispatch('getCurrentUserId');
        const pushData = {
          name,
          limit,
          date: moment(Date.now()).format('DD.MM.YYYY HH:mm')
        };

        const newCategory = await firebase.database().ref(`/users/${userId}/categories`).push(pushData);
        commit('addCategory', { ...pushData, id: newCategory.key });

        message.success('Category successfully added')
      } catch (e) {
        message.error(e.message);
      }
    },
    async removeCategory({ commit, dispatch }, id) {
      try {
        const userId = await dispatch('getCurrentUserId');
        await firebase.database().ref(`/users/${userId}/categories`).child(id).remove();
        commit('deleteCategory', id);

        message.success('Category successfully removed')
      } catch (e) {
        message.error(e.message);
      }
    }
  },
  getters: {
    categories: ({ categories }) => categories,
    isLoading: ({ isLoading }) => isLoading
  }
}
