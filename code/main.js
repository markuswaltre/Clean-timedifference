// timeoffsets for time where user "starts" and
// offsets time to where user wants to compare: "end"
// measured here in hours
var offsets = { 
    start : 0,
    end : 0
};

// compute the total offset (daylight and timezone)
// from seconds to hours as well
function totalOffset(dst, raw) {
  return (dst+raw)/(60*60);
}

// encodes the address from a string
// to a location in Latitud & Longitud
// nested retrieveTime to avoid async callback
function codeAddress(address, first) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      removeMessage();
      var location = results[0].geometry.location;
      retrieveTime(location.lat() + "," + location.lng(), first);
    } else {
      setErrorMessage(status);
    }
  });
}

// calls the googlemaps timezone api
// to retrieve timeoffsets for the location
// saves to the global variables start&end offsets
function retrieveTime(location, first) {
    var temp;
    var unix_time = moment().unix();
    var url = "https://maps.googleapis.com/maps/api/timezone/json?location="
                + location + "&timestamp=" + unix_time + "&sensor=false";
    $.getJSON(url, function(json) { 
        if(json.status == "OK") {
          removeMessage();
          temp = json;
          if(first) {
            offsets.start = totalOffset(temp.dstOffset, temp.rawOffset);
          }
          else {
            offsets.end = totalOffset(temp.dstOffset, temp.rawOffset);
          }
        } else {
          setErrorMessage(json.status);
        }
  });
}

// listens to changes in start&end offsets
// then changes values in html
watch(offsets, ["start", "end"], function() {
    // check difference in time
    var message;
    var diff = -(offsets.start-offsets.end);
    if(diff > 0) diff = "+" + diff + " Hours";
    else if (diff == 0) diff = "";
    else diff = diff + " Hours";

    // update spans for times
    var start = moment().zone(-(offsets.start)).format('HH:mm'),
        end = moment().zone(-(offsets.end)).format('HH:mm');
    $('#start').html(start);
    $('#diff').html(diff);
    $('#end').html(end);

    setMessage(start, diff, end);
});

// function is called when form is completed with enter
// goes into codeaddress to perfom time update
function codeBothAdresses() {
  var address_start = $("#address_start").val();
  var address_end = $("#address_end").val();

  // true for start, false for end
  codeAddress(address_start, true);
  codeAddress(address_end, false);
}

// listens to keypress enter
// submits form on enter
// listens to submit and enter codeBothAdresses
$(document).ready(function(){
  $(document).keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      $('#formid').submit();
    }
  });
  $('#formid').submit(function(e){
    e.preventDefault();
    codeBothAdresses();
  });
});