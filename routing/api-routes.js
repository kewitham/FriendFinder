var friendData = require('../data/friends.js');

// ===============================================================================
// ROUTING
// ===============================================================================



module.exports = function (app) {
	// API GET Requests
	// Below code handles when users "visit" a page.
	// In each of the below cases when a user visits a link
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function (req, res) {
		res.json(friendData);
	});
	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a reservation request... this data is then sent to the server...
	// Then the server saves the data to the tableData array)
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function (req, res) {
		 friendData.push(req.body);
		 for (i=0; i<(friendData.length -1); i++){
		 	var newFriend = friendData[friendData.length].questions;
		 	var friendDiff = [];
		 	var totalDiff = [];
		 	for (b=0; b<friendData.questions.length; b++){
		 	friendDiff.push(Math.abs(newFriend[b] - friendData[i].questions[b]));
		 	}
		 	totalDiff.push(friendDiff.reduce(add, 0))
		 	// Array.min = function(array){
		 	// 	return Math.min.apply(Math, array);
		 	// }
		 	Array.min = function indexOfMin(arr) {
    			if (arr.length === 0) {
        		return -1;
   									 }

   			var min = arr[0];
   			var minIndex = 0;

    		for (var i = 1; i < arr.length; i++) {
        		if (arr[i] < min) {
            	minIndex = i;
            	min = arr[i];
        		}
    		}

    		return minIndex;
			}
		 	
		 	var bestFriendIndex = Array.min(totalDiff);
		 	var bestFriend = friendData[bestFriendIndex].survey_name + friendData[bestFriendIndex].survey_photo;

		 	alert("Your closest match is " + bestFriend)
		 	//res.json(true); // KEY LINE
		 }
	});

	// ---------------------------------------------------------------------------

	app.post('/api/clear', function () {
		friendData = [];

		//console.log(friendData);
	});
};