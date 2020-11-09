import moment from 'moment';
import firebase from 'firebase';
import {message} from 'ant-design-vue';

export default {
  state: {
    recordsIsLoading: false,
    recordsList: []
  },
  mutations: {
    setRecords(state, records) {
      state.recordsList = records;
    },
    setRecord(state, record) {
      state.recordsList = [
        ...state.recordsList,
        {
          ...record,
          index: state.recordsList.length + 1
        }
      ];
    },
    setRecordsLoader(state, boolean) {
      state.recordsIsLoading = boolean;
    }
  },
  actions: {
    async getRecords({ commit, dispatch }) {
      try {
        commit('setRecordsLoader', true);
        const userId = await dispatch('getCurrentUserId');
        const records = (await firebase.database().ref(`/users/${userId}/records`).once('value')).val();
        const recordsData = Object.keys(records).map((key, index) => ({...records[key], id: key, index: index + 1}));
        commit('setRecords', recordsData);
        commit('setRecordsLoader', false);
      } catch (e) {
        commit('setRecordsLoader', false);
      }
    },
    async createRecord({ dispatch, commit }, { record, bill, categoryName }) {
      try {
        const userId = await dispatch('getCurrentUserId');
        const pushData = {
          ...record,
          categoryName,
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
    recordsList: ({ recordsList }) => recordsList,
    recordsIsLoading: ({ recordsIsLoading }) => recordsIsLoading
  }
}
