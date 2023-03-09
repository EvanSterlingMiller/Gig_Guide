// manually change the city in tempSubmit until tied to a submit box
var tempSubmit = "Chicago"


// worldwide typecase api call for location codes and coordinates (lines 6-26 code snipet)
const encodedParams = new URLSearchParams();
encodedParams.append("q", tempSubmit);
encodedParams.append("language", "en_US");

const options = {
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

  console.log(cityName)
  // send location code and coordinates to additional API calls
  concertsCall(cityLatitude,cityLongitude)
  restaurantsCall(cityLocationID)
  hotelsCall(cityLatitude,cityLongitude)

})
.catch(error => console.error(error));

// get local concerts from ticketmasters API
function concertsCall(latitude,longitude) {
  var url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=XYPBmlXoMkahvAVuAZyfC5v6FE7Se5So&latlong=${latitude},${longitude}&radius=10&unit=miles&size=5`;

  fetch(url)
    .then(myResponse => myResponse.json())
    .then(myData => {
      myData._embedded.events.forEach(myEvent => {
        var localConcerts =  (myEvent.dates.start.localDate) + " " + (myEvent.name)
        console.log(localConcerts);  
      });
    });
}

// get local Restaurants from Worldwide restaurants on rapidapi.com (lines 53-71 code snipet)
function restaurantsCall(location) {
  const encodedParams = new URLSearchParams();
  encodedParams.append("language", "en_US");
  encodedParams.append("limit", "5");
  encodedParams.append("location_id",location);
  encodedParams.append("currency", "USD");
  
  const options = {
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
    data.results.data.forEach(property => {
      var localRestaurants =  "Restaurant: " + (property.name) + " | " + (property.address)
      console.log(localRestaurants);  
    });
  })
  .catch(error => console.error(error));
  
}

// get local hotels from hotel4 on rapidapi.com (lines 86-137 code snipet)
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
        "day": 10,
        "month": 10,
        "year": 2022
      },
      "checkOutDate": {
        "day": 15,
        "month": 10,
        "year": 2022
      },
      "rooms": [
        {
          "adults": 2,
          "children": [
            {
              "age": 5
            },
            {
              "age": 7
            }
          ]
        }
      ],
      "resultsStartingIndex": 0,
      "resultsSize": 5,
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
    data.data.propertySearch.properties.forEach(property => {
      var localHotels =  "Hotel: " + (property.name)
      console.log(localHotels);  
    });
  })
  .catch(error => console.error(error))
  
}

