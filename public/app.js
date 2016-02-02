window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  var selectElement = document.querySelector("select");
  var countries = undefined;
  var timeOffset = 0;

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
    // document.getElementById("time").innerText = 0;
    if(!isNaN(parseInt(country.timezones[0].substr(3,5)))){
      timeOffset = parseInt(country.timezones[0].substr(3,5));
    }else{
      timeOffset = 0;
    }
  }

  request.send(null);

  var updateTime = function(){
    var time = new Date(Date.now());
    time.setTime(time.getTime() + (timeOffset*60*60*1000));

    document.getElementById("time").innerText = time.toLocaleString();
  }

  window.setInterval(updateTime, 1000);

};
