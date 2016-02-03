window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  var selectElement = document.querySelector("select");
  var countries = undefined;

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
  }

request.send(null);

};
