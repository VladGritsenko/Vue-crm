import firebase from 'firebase/app';
import {message} from 'ant-design-vue';

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    async clearUserInfo(state) {
      await firebase.auth().signOut();
      state.userInfo = {};
    },
  },
  actions: {
    async getUserInfo({ dispatch, commit }) {
      const userId = await dispatch('getCurrentUserId');
      const userInfo = (await firebase.database().ref(`/users/${userId}/info`).once('value')).val();
      commit('setUserInfo', userInfo);
    },
    async updateUserInfo({ commit, dispatch }, userInfo) {
      try {
        const userId = await dispatch('getCurrentUserId');
        await firebase.database().ref(`/users/${userId}/info`).update(userInfo);
        commit('setUserInfo', userInfo);
        message.success('User successfully edited')
      } catch (e) {
        message.error(e.message);
      }
    },
  },
  getters: {
    userInfo: ({ userInfo }) => userInfo
  }
}
