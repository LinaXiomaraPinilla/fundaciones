var config = {
    apiKey: "AIzaSyAYw9oqiQuL-PZCvK_SmI4XISO1KqoV9gY",
    authDomain: "fundaciones-99112.firebaseapp.com",
    databaseURL: "https://fundaciones-99112.firebaseio.com",
    projectId: "fundaciones-99112",
    storageBucket: "fundaciones-99112.appspot.com",
    messagingSenderId: "677086487567"
};
firebase.initializeApp(config);

var database = firebase.database();

var myJSONObject = [];
database.ref('/puntos').on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        myJSONObject.push(childSnapshot.val());
    });
   initialize();
});