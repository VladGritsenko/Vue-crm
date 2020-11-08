import firebase from 'firebase/app';
import { message } from 'ant-design-vue';
import moment from 'moment';

export default {
  actions: {
    async login(_, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        return true;
      } catch (e) {
        message.error(e.message);
      }
    },
    async registration({ dispatch }, { email, password, username }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userId = await dispatch('getCurrentUserId');
        if (userId) {
          await firebase.database().ref(`/users/${userId}/info`).set({
            bill: 1000,
            name: username,
            phone: '',
            email: '',
            city: ''
          });
          await firebase.database()
            .ref(`/users/${userId}/categories`)
            .push({
              name: 'Home',
              limit: 1000,
              date: moment(Date.now()).format('DD.MM.YYYY HH:mm')
            });
        }

        return true;
      } catch (e) {
        message.error(e.message);
      }
    },
    getCurrentUserId() {
      return firebase.auth().currentUser?.uid;
    }
  }
}
