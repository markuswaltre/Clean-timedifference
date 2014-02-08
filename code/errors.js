/* for JSON

INVALID_REQUEST indicates that the request was malformed.
OVER_QUERY_LIMIT indicates the requestor has exceeded quota.
REQUEST_DENIED indicates that the the API did not complete the request. Confirm that the request was sent over http instead of https.
UNKNOWN_ERROR indicates an unknown error.
ZERO_RESULTS indicates that no time zone data could be found for the specified position or time. Confirm that the request is for a location on land, and not over water.

*/

/* for geocode

ZERO_RESULTS indicates that the geocode was successful but returned no results. This may occur if the geocode was passed a non-existent address or a latng in a remote location.
OVER_QUERY_LIMIT indicates that you are over your quota. Refer to the Usage limits exceeded article in the Maps for Business documentation, which also applies to non-Business users, for more information.
REQUEST_DENIED indicates that your request was denied for some reason.
INVALID_REQUEST generally indicates that the query (address or latLng) is missing.

*/

function setErrorMessage(error) {
	var output;

	if(error == "INVALID_REQUEST") {
		output = "It appears that the server couldn't understand us. Hmm.";
	}

	else if(error == "OVER_QUERY_LIMIT") {
		output = "You are going to fast! The server is getting stressed!";
	}

	else if(error == "REQUEST_DENIED") {
		output = "Ah dammit' the server doesn't want to help us.";
	}

	else if(error == "UNKNOWN_ERROR") {
		output = "At the moment we don't know whats happening... try again?";
	}

	else if(error == "ZERO_RESULTS") {
		output = "Are you sure this is a real place? Because I've never heard of it."
	}

	displayMessage(output);
}

function setMessage(start, diff, end) {
	var output;

	if(diff == "") {
		output = "It appears the places are in the same timezones. Intriguing.";
	}

	displayMessage(output);
}

function removeMessage() {
	$('#message').html("");
}

function displayMessage(message) {
	$('#message').html(message);
}







