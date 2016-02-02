window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();

  request.open('GET', url);

  request.onload = function(){
    if(request.status === 200){
      console.log("got the data");
      var countries = JSON.parse(request.responseText);
      console.log(countries);

      var selectElement = document.querySelector("select");

      for (var i = 0; i < countries.length; i++) {
        var option = document.createElement("option");
        option.value = [i];
        option.innerText = countries[i].name;
        selectElement.appendChild(option);
      }
    }
  }

request.send(null);

};
