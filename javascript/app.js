$(document).ready(function(){

var config = {
	apiKey: "AIzaSyAWzaJ9XRdN3LDeK4sCii2LzP7BHZlu88Q",
	authDomain: "trainschedule-fcff2.firebaseapp.com",
	databaseURL: "https://trainschedule-fcff2.firebaseio.com",
	projectId: "trainschedule-fcff2",
	storageBucket: "",
	messagingSenderId: "819990671964"
};

firebase.initializeApp(config);

	// starting variables
	var database = firebase.database();
	var trainName = "";
	var destination = "";
	var firstTrain = 0;
	var frequency = 0;

	// 

});