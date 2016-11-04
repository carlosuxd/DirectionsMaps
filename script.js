// MAPS
function initMap() {
  // Geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // Cleaners location
      var origen = {
        lat: -17.370574,
        lng:  -66.153000
      }
      var map = new google.maps.Map(document.getElementById('map'), {
          center: pos,
          scrollwheel: true,
          zoom: 16
      });
      var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
      });
      // var marker = new google.maps.Marker({
      //     map: map,
      //     position: pos,
      //     draggable: true,
      //     animation: google.maps.Animation.DROP,
      //     title: 'You are here'
      //   });
      var request = {
        destination: pos,
        origin: origen,
        travelMode: 'DRIVING'
      };
      map.setCenter(pos);
      var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          }
        });
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
// Marker animation
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
// END MAPS