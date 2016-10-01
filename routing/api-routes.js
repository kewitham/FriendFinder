

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

	$("#submitsurvey").on("click", function() {

    // Here we grab the form elements
    var newFriend = {
        name: $('#survey_name').val().trim(),
        id: $('#survey_uniqueID').val().trim(),
        photo: $('#survey_photo'),
        questions: [$('#survey_Q1').val().trim(), $('#survey_Q2').val().trim(), $('#survey_Q3').val().trim(), $('#survey_Q4').val().trim(), $('#survey_Q5').val().trim(), $('#survey_Q6').val().trim(), $('#survey_Q7').val().trim(), $('#survey_Q8').val().trim(), $('#survey_Q9').val().trim(), $('#survey_Q10').val().trim()],
    };

    console.log(newFriend);

	app.post('/api/friends', function (req, res) {
		friendArray.push(req.body);

	// 	var matchIndex = 0;
	// 	var differences = [];

	// 	for ( var i = 0; i < friendsData.length; i++ ) {

 //    		var totalDifference = 0;

 //    	for ( var j = 0; j < friendsData[ i ].scores.length; j++ ) {
 //        totalDifference += Math.abs( req.body.scores[ j ] - friendsData[ i ].scores[ j ] );
 //    	}

 //    differences.push( totalDifference );
	// }

	// matchIndex = differences.indexOf( Math.min.apply( Math, differences ) );
	// console.log(matchIndex)
	 		for (i=0; i<(friendArray.length-1); i++){
	            var newFriend = friendArray[friendArray.length];
	            console.log('New:', newFriend)
	            var friendDiff = [];
	            var totalDiff = [];
		            for (b=0; b<friendArray.questions.length; b++){
		            friendDiff.push(Math.abs(newFriend[b] - friendArray[i].questions[b]));
		            }
			            console.log(friendDiff)
			            totalDiff.push(friendDiff.reduce(add, 0))
            // Array.min = function(array){
            //  return Math.min.apply(Math, array);
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
            console.log(bestFriendIndex);
            var bestFriend = friendArray[bestFriendIndex].survey_name + friendArray[bestFriendIndex].survey_photo;
            console.log(bestFriend);
            alert("Your closest match is " + bestFriend)
                 }
             });
});
		 	

		 	//res.json(false); // KEY LINE
		 //}
		 //friendData.push(req.body);

	// ---------------------------------------------------------------------------

	app.post('/api/clear', function () {
		friendData = [];

		//console.log(friendData);
	});
};