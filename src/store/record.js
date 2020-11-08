import moment from 'moment';
import firebase from 'firebase';
import {message} from 'ant-design-vue';

export default {
  state: {
    recordsList: []
  },
  mutations: {
    setRecord(state, record) {
      state.recordsList = [
        ...state.recordsList,
        {
          ...record,
          index: state.recordsList.length + 1
        }
      ];
    }
  },
  actions: {
    async createRecord({ dispatch, commit }, { record, bill}) {
      try {
        const userId = await dispatch('getCurrentUserId');
        const pushData = {
          ...record,
          date: moment(Date.now()).format('DD.MM.YYYY HH:mm')
        };

        const newRecord = await firebase.database().ref(`/users/${userId}/records`).push(pushData);
        await firebase.database().ref(`/users/${userId}/info`).update({ bill });
        commit('setRecord', { ...pushData, id: newRecord.key });

        message.success('Record successfully added')
      } catch (e) {
        message.error(e.message);
      }
    }
  },
  getters: {
  }
}
