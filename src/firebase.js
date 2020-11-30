import firebase from 'firebase/app'
import "firebase/database";

let config = {
  apiKey: "AIzaSyD-UCGU_moRXcNBe0KSFsh5ldGOCuC38qA",
  authDomain: "recipesapp-2bca2.firebaseapp.com",
  databaseURL: "https://recipesapp-2bca2.firebaseio.com",
  projectId: "recipesapp-2bca2",
  storageBucket: "recipesapp-2bca2.appspot.com",
  messagingSenderId: "111720944892",
  appId: "1:111720944892:web:82fe42f611aca96dfeb379",
  measurementId: "G-1PRC97T9W4"
};

firebase.initializeApp(config);

export default firebase.database();