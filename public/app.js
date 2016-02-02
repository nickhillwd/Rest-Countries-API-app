window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();

  request.open('GET', url);

  request.onload = function(){
    if(request.status === 200){
      console.log("got the data");
      var jsonParse = JSON.parse(request.responseText);
      console.log(jsonParse);

  }
}

request.send(null);

};
