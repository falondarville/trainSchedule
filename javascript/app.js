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
var nextArrival = 0;
var minutesAway = 0;

// on button click event
$("#submitButton").on("click", function(){

	event.preventDefault();

	$("#trainName").empty();
	$("#destination").empty();
	$("#firstTrain").empty();
	$("#frequency").empty();

	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#firstTrain").val().trim();
	frequency = $("#frequency").val().trim();

	// calculate nextArrival and minutesAway

	// push information to Firebase
    database.ref().push({
    	trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

    var newLine = $("<tr></tr>"); 

	newLine.append('<td>' + trainName + '</td>');
	newLine.append('<td>' + destination + '</td>');
	newLine.append('<td>' + firstTrain + '</td>');
	//append calculated next arrival time
	//append calculated minutes away

	$("#tbody").append(newLine);
});

});