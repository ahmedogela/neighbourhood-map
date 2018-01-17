// THIRD PARTY FOURSQUARE API CONSTANTS
const foursquareSearch = "https://api.foursquare.com/v2/venues/search?near=";
const nearLocation = "Cairo, Muḩāfaz̧at al Qāhirah,Egypt";
const GeoId = "&nearGeoId=72057594038288566&q=Restaurant";
const authToken = "&oauth_token=ZST3LPWE1QN2CJA4DQB3JGTJM4QHJXMNCFLYJPG0CL4R1KGT&v=20180115";
const fullFoursquareURL = foursquareSearch + nearLocation + GeoId + authToken;
var map,
    restaurants = [],
    infowindow;

function RestaurantsViewModel() {
  var self = this;
  // CREATE RESTAURANT LIST AS ARRAY OBSERVABLE
  self.restaurants = ko.observableArray(restaurants);

  // SEARCH BAR VALUE OBSERVABLE
  self.searchValue = ko.observable("");

  // SHOW MARKER FOR EACH LOCATION IN THE CREATED LIST
  self.restaurants().forEach(function(elem) {
    var marker = new google.maps.Marker({
      position: {
          lat: elem.location.lat,
          lng: elem.location.lng
      },
      map: map,
      title: elem.name,
      icon: './img/map-marker.png',
      animation: google.maps.Animation.DROP,
      id: elem.id
    });
    elem.marker = marker;
    
    // initiate infowindow with empty content and maxwidth 250px;
    infowindow = new google.maps.InfoWindow({
      maxWidth:250,
      content: ""
    });

    // listen to marker clicks and animate it, update infowindow content and open the marker infowindow
    marker.addListener('click', function() {
      timedAnimation(elem, google.maps.Animation.BOUNCE);
      infowindow.setContent(infoWindowContnet(elem));
      infowindow.open(map, marker);
    });   
  });

  // listen to map click to close the previous opened infowindow
  map.addListener("click", function(){
      infowindow.close();
  });
  // FILTERED LIST OBSERVABLE
  self.filterRestaurants = ko.dependentObservable(function() {
    var self = this;
    if (!self.searchValue()) {
      return ko.utils.arrayFilter(self.restaurants(), function(data) {
        // SHOW THE LOCATION MARKER IF IT EXISTS IN THE SEARCH
        data.marker.setVisible(true);
        timedAnimation(data, google.maps.Animation.DROP);
        return true;
      });
    } else {
      return ko.utils.arrayFilter(self.restaurants(), function(data) {
        if (data.name.toLowerCase().indexOf(self.searchValue().toLowerCase()) >= 0) {
          // SHOW THE LOCATION MARKER IF IT EXISTS IN THE SEARCH
          data.marker.setVisible(true);
          timedAnimation(data, google.maps.Animation.DROP)
          return true;
        } else {
          // HIDE THE LOCATION MARKER IF IT DOESN'T EXIST IN THE SEARCH
          data.marker.setVisible(false);
          return false;
        }
      });
    }
  }, this);

  // To open infowindow when click an item of the listed locations
  self.setRestaurant = function(data) {
    console.log(data);
    timedAnimation(data, google.maps.Animation.BOUNCE);
    infowindow.setContent(infoWindowContnet(data));
    infowindow.open(data.map, data.marker);
  };
}


function initMap() {
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 30.062582630470757, 
      lng: 31.248818198177236
    },
    zoom: 17,
    styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
    ]
  });
}

// animation function with timedout animation
function timedAnimation(data, animation) {
  data.marker.setAnimation(animation);
  // settime to stop the repeated animation if exist.
  setTimeout(function() {
    data.marker.setAnimation(null);
  }, 800);
}

// infowindow Contnet function
function infoWindowContnet(data) {
  return "<h2>Welcome To</h2><h3>" + data.name + "</h3><div><h4>" + data.location.country + "</h4><hr><h5> lat: " + data.location.lat + " --- lng: " + data.location.lng + "</h5></div>"
}

// fetch foursquare API for restaurants list in Cairo, Egypt
$.get(fullFoursquareURL, function(data) {
  restaurants = data.response.venues;
  // apply knockout after getting the foursquare api fetch success
  ko.applyBindings(new RestaurantsViewModel());
}).fail(function(err) {
  alert("Connection Error \n" + err.message);
});

