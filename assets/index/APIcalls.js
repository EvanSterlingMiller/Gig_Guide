// Matt code
var submitButton = document.getElementById("submit-button");
var cityInput = document.getElementById("city-input");

// enter key function
cityInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    submitButton.click();
  }
});


submitButton.addEventListener("click", function() {
  var tempSubmit = cityInput.value;

  // worldwide typecase api call for location codes and coordinates
  var encodedParams = new URLSearchParams();
  encodedParams.append("q", tempSubmit);
  encodedParams.append("language", "en_US");

  var options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'b26789b06bmsh4d9abf489373262p19b7f7jsn7e21d9304ef3',
      'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
    },
    body: encodedParams
  };

  fetch('https://worldwide-restaurants.p.rapidapi.com/typeahead', options)
  .then(response => response.json())
  .then(data => {
    var cityLocationID = data.results.data[0].result_object.location_id
    var cityLatitude = data.results.data[0].result_object.latitude
    var cityLongitude = data.results.data[0].result_object.longitude
    var cityName = "Gigs, Grub and Places to stay in " + (data.results.data[0].result_object.name)

    // send location code and coordinates to additional API calls
    concertsCall(cityLatitude,cityLongitude)
    restaurantsCall(cityLocationID)
    hotelsCall(cityLatitude,cityLongitude)
  })
  .catch(error => console.error(error));
});

// get local concerts from ticketmasters API
function concertsCall(latitude,longitude) {
  var url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=XYPBmlXoMkahvAVuAZyfC5v6FE7Se5So&latlong=${latitude},${longitude}&radius=10&unit=miles&classificationName=music&size=5`;

  fetch(url)
    .then(myResponse => myResponse.json())
    .then(myData => {
      var concertsElement = document.getElementById("concerts");
      concertsElement.innerHTML = ""; // clear previous results
      myData._embedded.events.forEach(myEvent => {
        var localConcerts =  (myEvent.dates.start.localDate) + " " + (myEvent.name);

        var maxLength = 40; // maximum length of string
        if (localConcerts.length > maxLength) {
          localConcerts = localConcerts.slice(0, maxLength); // limit 
          var lastSpaceIndex = localConcerts.lastIndexOf(" ");
          if (lastSpaceIndex !== -1) {
            localConcerts = localConcerts.slice(0, lastSpaceIndex);
          }
        }

        var concertElement = document.createElement("div");
        concertElement.textContent = localConcerts;
        
        var img = document.createElement("img");
        img.src = myEvent.images[0].url;
        img.width = 100;
        
        var imgWrapper = document.createElement("div");
        imgWrapper.appendChild(img);
        
        concertElement.appendChild(imgWrapper);
        concertsElement.appendChild(concertElement);
      });
    });
}

// get local Restaurants from Worldwide restaurants on rapidapi.com
function restaurantsCall(location) {
  var encodedParams = new URLSearchParams();
  encodedParams.append("language", "en_US");
  encodedParams.append("limit", "10");
  encodedParams.append("location_id",location);
  encodedParams.append("currency", "USD");

var options = {
method: 'POST',
headers: {
  'content-type': 'application/x-www-form-urlencoded',
  'X-RapidAPI-Key': 'b26789b06bmsh4d9abf489373262p19b7f7jsn7e21d9304ef3',
  'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
},
body: encodedParams
};

fetch('https://worldwide-restaurants.p.rapidapi.com/search', options)
.then(response => response.json())
.then(data => {
var restaurantsElement = document.getElementById("restaurants");
restaurantsElement.innerHTML = ""; // clear previous results
data.results.data.forEach(property => {
  var localRestaurants =  (property.name) + " | " + (property.address);
  var restaurantElement = document.createElement("div");
  restaurantElement.textContent = localRestaurants;
  restaurantsElement.appendChild(restaurantElement);
});
})
.catch(error => console.error(error));
}

// get local hotels from hotel4 on rapidapi.com
function hotelsCall(latitude,longitude) {
latitude = parseFloat(latitude);
longitude = parseFloat(longitude);

fetch("https://hotels4.p.rapidapi.com/properties/v2/list", {
"method": "POST",
"headers": {
  "Content-Type": "application/json",
  "X-Rapidapi-Key": "edf9b22aafmsh019b8390d5e71e2p1ea644jsnf46c23929872",
  "X-Rapidapi-Host": "hotels4.p.rapidapi.com"
},
"body": JSON.stringify({
  "currency": "USD",
  "eapid": 1,
  "locale": "en_US",
  "siteId": 300000001,
  "destination": {
    "coordinates": {"latitude": latitude, "longitude": longitude}
  },
  "checkInDate": {
    "day": 14,
    "month": 7,
    "year": 2023
  },
  "checkOutDate": {
    "day": 15,
    "month": 7,
    "year": 2023
  },
  "rooms": [
    {
      "adults": 2,
    }
  ],
  "resultsStartingIndex": 0,
  "resultsSize": 10,
  "sort": "PRICE_LOW_TO_HIGH",
  "filters": {
    "price": {
      "max": 150,
      "min": 100
    }
  }
})
})
.then(response => response.json())
.then(data => {
var hotelsElement = document.getElementById("hotels");
hotelsElement.innerHTML = ""; // clear previous results
data.data.propertySearch.properties.forEach(property => {
  var localHotels =   (property.name);
  var hotelElement = document.createElement("div");
  hotelElement.textContent = localHotels;
  hotelsElement.appendChild(hotelElement);
});
})
.catch(error => console.error(error));
}


