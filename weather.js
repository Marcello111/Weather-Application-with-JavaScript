((d) => { 

  let show = d.getElementById("show");
  let displayTemp = d.getElementById("temperature");
  let displayDesc = d.getElementById("description");
  let displayLoc = d.getElementById("location");
  let displayIco = d.getElementById("picture");
  let result = d.getElementById("result");
  let overlay = d.getElementById("overlay");
  const kelvin = 273;

  // Store app data
  let weather = {};

  weather.temperature = {
    unit : "celsius"
  };


  // API key
  const key= "6489ee30ecaa7bf763098f6967131257";


  show.addEventListener("click", function(){

    // Display a div with results/data on screen
    result.style.display="block";
    overlay.style.display="block";


    // Cordinates of Bristol
    let latitude = 51.45523;
    let longitude = -2.59665;

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    // API request and response
    fetch(api)
      .then(function(response){
        let data = response.json();
        return data;
      })
      .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
      })
      .then(function(){
        displayWeather();
      });     
  })

  // Display data on screen
  function displayWeather(){
    displayTemp.textContent = `${weather.temperature.value}°C`;
    displayDesc.textContent = weather.description;
    displayLoc.textContent = `${weather.city}, ${weather.country}`;
    displayIco.innerHTML = `<img src="img/${weather.iconId}.png">`;
  }

})(document);