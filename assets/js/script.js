$(document).ready(function() {
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=XYPBmlXoMkahvAVuAZyfC5v6FE7Se5So&city=Hartford&stateCode=CT&countryCode=US&size=10";
​
    $.getJSON(url, function(data) {
      var concerts = data._embedded.events;
      console.log(data)
      for (var i = 0; i < concerts.length; i++) {
        var concert = concerts[i];
        var concertDate = new Date(concert.dates.start.localDate).toLocaleDateString();
        var concertTime = concert.dates.start.localTime 
        var concertVenue = concert._embedded.venues[0].name;
        var concertArtist = concert._embedded.attractions[0].name;
        var concertItem = "<li>" + concertArtist + " at " + concertVenue + " on " + concertDate + " at " + concertTime + "</li>";
        $("#concert-list").append(concertItem);
      }
    });
  });