
//show date and time
function formatDate(timestamp){
    //let timestamp = new Date();
    
    
    //let timeDate = document.querySelector("#current-date");
    //let time = document.querySelector("#current-time");
    let date = new Date(timestamp);
//console.log(date.toDateString());
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }
    
    let year = date.getFullYear();
    
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];
    
    
    
    return `${date.toDateString()}`;
    
    //return `${day}, ${month}, ${year} ${hour}:${minute}`;
    
    //timeDate.innerHTML = `${date}, ${year}`;
    //time.innerHTML = `${hour}:${minute}`; 

}

function formatTime(timestamp){

    let date = new Date(timestamp);
    //let time = document.querySelector("#current-time");
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }
    //time.innerHTML = `${hour}:${minute}`; 
    return `${hour}:${minute}`;
}

//function for forecasting

 function getForecast(coordinates){
    //console.log(coordinates);
    let apiKey = "c7c6992fb4b628387a33963036074203";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}


function searchPlace(event) {
    event.preventDefault();
    let newCity = document.querySelector("#search-input");
    //let replaceCity = document.querySelector("#current-city");
    newCity = newCity.value;
    //newCity = newCity.toUpperCase();
    //replaceCity.innerHTML = `Current place: ${newCity}`;

    /* console.log(newCity); */

   
    
    function showTemperature(response) {
        console.log(response.data.dt);
        let degree = document.querySelector("#degreeShow");
        let temperature = Math.round(response.data.main.temp);
        degree.innerHTML = `${temperature}`;
        celsiusTemperature = response.data.main.temp;
        document.querySelector("#current-city").innerHTML = response.data.name;
        //document.querySelector("#high-temp").innerHTML = Math.round(response.data.main.temp_max);
        //document.querySelector("#low-temp").innerHTML = Math.round(response.data.main.temp_min);
        console.log(response.data);

        document.querySelector("#humidity").innerHTML = response.data.main.humidity;
        document.querySelector("#wind").innerHTML = Math.round(
            response.data.wind.speed);
        document.querySelector("#description").innerHTML =
            response.data.weather[0].main;
        document.querySelector("#current-date").innerHTML = formatDate(response.data.dt * 1000);
        document.querySelector("#current-time").innerHTML = formatTime(response.data.dt * 1000);

        let iconElement =  document.querySelector("#icon");
       iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
       iconElement.setAttribute("alt", response.data.weather[0].description);
       getForecast(response.data.coord);

    };
    let apiKey = "c7c6992fb4b628387a33963036074203";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndPoint}q=${newCity}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
    


}

let button = document.querySelector("button");
button.addEventListener("click", searchPlace);



//show current location

function showPosition(position) {

    let h3 = document.querySelector("h3");
    let latitude = position.coords.latitude;
    latitude = latitude.toFixed(2);
    let longitude = position.coords.longitude;
    longitude = longitude.toFixed(2);
    /* console.log(latitude);
    console.log(longitude); */
    h3.innerHTML = `Your Latitude is ${latitude} and Your Longitude is ${longitude} `;
}


function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

let gPS = document.querySelector("button1");
gPS.addEventListener("click", getCurrentPosition);


//celsius and farenheit show

function displayFarenheitTemp(event){
    event.preventDefault();
    let farenheitTemperature = ((celsiusTemperature * 9)  /  5) + 32;
   document.querySelector("#degreeShow").innerHTML = Math.round (farenheitTemperature);
    //remove active class from Celsius Link
celsiusLink.classList.remove("active");
//add active to Farenheit Link
farenheitLink.classList.add("active");


    
}

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let celsiusTemperature = null;

function displayCelsiusTemp(event){
    event.preventDefault();
    document.querySelector("#degreeShow").innerHTML = Math.round(celsiusTemperature);
   
celsiusLink.classList.add("active");

farenheitLink.classList.remove("active");
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

//show New York by default whenever page is reloaded

function showDefaultPlace(response){
    
        let degree = document.querySelector("#degreeShow");
        let temperature = Math.round(response.data.main.temp);
        degree.innerHTML = `${temperature}`;
        celsiusTemperature = response.data.main.temp;
        document.querySelector("#current-city").innerHTML = response.data.name;
        //document.querySelector("#high-temp").innerHTML = Math.round(response.data.main.temp_max);
        //document.querySelector("#low-temp").innerHTML = Math.round(response.data.main.temp_min);
        console.log(response.data);

        document.querySelector("#humidity").innerHTML = response.data.main.humidity;
        document.querySelector("#wind").innerHTML = Math.round(
            response.data.wind.speed);
        document.querySelector("#description").innerHTML =
            response.data.weather[0].main;
        document.querySelector("#current-date").innerHTML = formatDate(response.data.dt * 1000);
        document.querySelector("#current-time").innerHTML = formatTime(response.data.dt * 1000);

        let iconElement =  document.querySelector("#icon");
       iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
       iconElement.setAttribute("alt", response.data.weather[0].description);
       getForecast(response.data.coord);
       
}


function search(city){
    
    let apiKey = "c7c6992fb4b628387a33963036074203";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndPoint}q=new york&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showDefaultPlace);
}

search();


//weather forecast

function formatDayInForecast(timestamp){
    let date = new Date (timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //let month = date.getMonth();
    return days[day];
    //return months[month];
    
}



function displayForecast(response){
    //console.log(response.data.daily);
    let forecast = response.data.daily;
    let forecastELement = document.querySelector("#forecast");
    //let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

    let forecastHTML =`<div class="row">`;

    forecast.forEach(function(forecastDay, index){
        if (index < 5)
        {
    forecastHTML = forecastHTML +
         `
        <div class="col-2" id= forecast-detail>
        <div class="weather-forecast-date">${formatDayInForecast(forecastDay.dt)}</div>
        <img
        src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt=""
        width="42"
        />
        <br />
        ${Math.round(forecastDay.temp.day)}℃  
        <small id=farenheitForecast>${Math.round(forecastDay.temp.day*9/5 + 32)}°F</small>
      </div>
    
    `;}
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastELement.innerHTML= forecastHTML;
};


