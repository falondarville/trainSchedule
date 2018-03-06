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

// on button click event
$("#submitButton").on("click", function(){

	event.preventDefault();

	//empty form
	$("#trainName").empty();
	$("#destination").empty();
	$("#firstTrain").empty();
	$("#frequency").empty();

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
        timeUntil: timeUntil,
        nextTrain: nextTrain
    });

    //append information to page
 //    var newLine = $("<tr></tr>"); 

	// newLine.append('<td>' + trainName + '</td>');
	// newLine.append('<td>' + destination + '</td>');
	// newLine.append('<td>' + frequency + '</td>');
	// newLine.append('<td>' + nextTrain + '</td>');
	// newLine.append('<td>' + timeUntil + '</td>');

	// $("#tbody").append(newLine);
});

//calculate train next arrival time and minutes until
//this works the first time but does not update
var timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
var difference = moment().diff(moment(timeConverted), "minutes");
var timeRemainder = difference % frequency;
var timeUntil = frequency - timeRemainder;
var nextTrain = moment().add(timeUntil, "minutes").format("HH:mm");

//produce persistence
database.ref().on("child_added", function(snapshot) {

	//grab a snapshot of the items stored on Firebase
	//why does this work? I am grabbing the data by ID and not by the name of the key on Firebase
	// $("#trainName").text(snapshot.val().trainName);
	// $("#destination").text(snapshot.val().destination);
	// $("#firstTrain").text(snapshot.val().firstTrain);
	// $("#frequency").text(snapshot.val().frequency);

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