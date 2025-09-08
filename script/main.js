let today = document.getElementById("today"),
  todayDate = document.getElementById("today-date"),
  cityLocation = document.getElementById("city-location"),
  todayDegree = document.getElementById("today-degree"),
  todayIcon = document.getElementById("today-icon"),
  description = document.getElementById("today-description"),
  humidity = document.getElementById("humidity"),
  wind = document.getElementById("wind"),
  compass = document.getElementById("compass"),
  searchBar = document.getElementById("search-bar");

let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description"),
  apiResponse,
  responseData,
  monthName = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'],
   days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];


async function getWeatherData(currentCity='cairo'){
  try {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
    responseData = await apiResponse.json();

    if(responseData.error){ 
      cityLocation.innerHTML = "City not found!";
      return;
    }

    displayTodayWeather();
    displayNextDayWeather();
  } catch(error) {
    console.log("Error fetching weather:", error);
    cityLocation.innerHTML = "Something went wrong!";
  }
}


// async function getWeatherData(currentCity='cairo'){
//    const apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
//    const  responseData= await apiResponse.json()
//    console.log(responseData)
//    displayTodayWeather();
//    displayNextDayWeather()
// }
// getWeatherData();



function displayTodayWeather(){

 let date = new Date();
 console.log(date)
 today.innerHTML= days[date.getDay()];
 todayDate.innerHTML = `${date.getDate()} ${ monthName[date.getMonth()]}`;
 cityLocation.innerHTML =  responseData.location.name;
 todayDegree.innerHTML = responseData.current.temp_c;
 todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`)
 description.innerHTML = responseData.current.condition.text;
 humidity.innerHTML = responseData.current.humidity;
 wind.innerHTML = responseData.current.wind_kph;
 compass.innerHTML =responseData.current.wind_dir;

}




function displayNextDayWeather(){
  for( let i=0; i<nextDay.length;i++){
   nextDay[i].innerHTML= days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
   nextDayIcon[i].setAttribute('src',`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
   maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
   minDegree[i].innerHTML =responseData.forecast.forecastday[i+1].day.mintemp_c;
   nextDayDescription[i].innerHTML =responseData.forecast.forecastday[i+1].day.condition.text;
  }
}


let typingTimer;
searchBar.addEventListener("keyup", function(){
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    let currentCity = searchBar.value;
    getWeatherData(currentCity);
  }, 500); // نصف ثانية انتظارdebounce
});


// searchBar.addEventListener("keyup",function(){ 
//   let currentCity= searchBar.value;
//   console.log( currentCity);
//   getWeatherData(currentCity);
// })

