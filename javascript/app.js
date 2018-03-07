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
var nextTrain = 0;
var timeUntil = 0;

// on button click event that grabs inputted information and calculates initial nextTrain and timeUntil values
$("#submitButton").on("click", function(){

	event.preventDefault();

	//empty form
	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrain").val("");
	$("#frequency").val("");

	var timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
	var difference = moment().diff(moment(timeConverted), "minutes");
	var timeRemainder = difference % frequency;
	var timeUntil = frequency - timeRemainder;
	var nextTrain = moment().add(timeUntil, "minutes").format("HH:mm");

	//assign inputted user information to variables
	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#firstTrain").val().trim();
	frequency = $("#frequency").val().trim();
	
	// push information to Firebase
    database.ref().push({
    	trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextTrain: nextTrain,
        timeUntil: timeUntil
    });

});

// //create function to update time every one second
// //how do I update the HTMl?
// setInterval(function() {

// 	//recalculate variables every one second
// 	timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
// 	difference = moment().diff(moment(timeConverted), "minutes");
// 	timeRemainder = difference % frequency;
// 	timeUntil = frequency - timeRemainder;
// 	nextTrain = moment().add(timeUntil, "minutes").format("HH:mm");
// 	console.log("NEXT TRAIN = " + nextTrain);
// 	console.log("TIME UNTIL = " + timeUntil);
// }, 1000);

//produce persistence
database.ref().on("child_added", function(snapshot) {

	//append values that live on Firebase
	var newLine = $("<tr></tr>"); 

	newLine.append('<td>' + snapshot.val().trainName + '</td>');
	newLine.append('<td>' + snapshot.val().destination + '</td>');
	newLine.append('<td>' + snapshot.val().frequency + '</td>');
	newLine.append('<td>' + snapshot.val().nextTrain + '</td>');
	newLine.append('<td>' + snapshot.val().timeUntil + '</td>');

	$("#tbody").append(newLine);
});

});