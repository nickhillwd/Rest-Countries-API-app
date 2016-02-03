window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  var selectElement = document.querySelector("select");
  var countries = undefined;
  var timeOffset = 0;
  var centre = {lat: 40.712784, lng: -74.005941};
  var zoom = 2;
  var map = new Map(centre, zoom);

  request.open('GET', url);

  request.onload = function(){
    if(request.status === 200){
      console.log("got the data");
      countries = JSON.parse(request.responseText);
      console.log(countries);

      for (var i = 0; i < countries.length; i++) {
        var option = document.createElement("option");
        option.value = [i];
        option.innerText = countries[i].name;
        selectElement.appendChild(option);
      }
    }
  }

  selectElement.onchange = function(event){

    var country = countries[event.target.value];

    document.getElementById("name").innerText = country.name;
    document.getElementById("capital").innerText = country.capital;
    document.getElementById("pop").innerText = country.population;
    document.getElementById("time").innerText = Date.now();
    console.log(country);
    latLng = {lat: country.latlng[0], lng:country.latlng[1]};
    map.addMarker(latLng);

    if(!isNaN(parseInt(country.timezones[0].substr(3,5)))){
      timeOffset = parseInt(country.timezones[0].substr(3,5));
    }else{
      timeOffset = 0;
    }
  }

  var updateTime = function(){
    var time = new Date(Date.now());
    time.setTime(time.getTime() + (timeOffset*60*60*1000));

    document.getElementById("time").innerText = time.toLocaleString();
  }

  request.send(null);
  window.setInterval(updateTime, 1000);

};
