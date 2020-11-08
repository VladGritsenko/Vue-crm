import firebase from 'firebase/app';

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    clearUserInfo(state) {
      state.userInfo = {};
    }
  },
  actions: {
    async getUserInfo({ dispatch, commit }) {
      const userId = await dispatch('getCurrentUserId');
      const userInfo = (await firebase.database().ref(`/users/${userId}/info`).once('value')).val();
      commit('setUserInfo', userInfo);
    }
  },
  getters: {
    userInfo: ({ userInfo }) => userInfo
  }
}
