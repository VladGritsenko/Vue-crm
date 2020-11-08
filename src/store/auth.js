import firebase from 'firebase/app';
import { message } from 'ant-design-vue';

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
        userId && await firebase.database().ref(`/users/${userId}/info`).set({
          bill: 1000,
          name: username
        });
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
