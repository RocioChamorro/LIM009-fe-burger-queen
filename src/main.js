import { init } from './view-controller/routes.js'

  var firebaseConfig = {
    apiKey: "AIzaSyCLjyZpkc8rgR5divkIBiFbb04bQ8ITqbY",
    authDomain: "burger-queen-4a56d.firebaseapp.com",
    databaseURL: "https://burger-queen-4a56d.firebaseio.com",
    projectId: "burger-queen-4a56d",
    storageBucket: "burger-queen-4a56d.appspot.com",
    messagingSenderId: "108967738722",
    appId: "1:108967738722:web:e3a7149f35d65125"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

window.addEventListener('load', () => {
  init()
});

