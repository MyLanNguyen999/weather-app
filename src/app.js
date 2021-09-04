function formatDate(timestamp){
    //let timestamp = new Date();
    
    
    //let timeDate = document.querySelector("#current-date");
    //let time = document.querySelector("#current-time");
    let date = new Date(timestamp);
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
    
    
    
    return `${day}, ${month}, ${year}`;
    //return `${day}, ${month}, ${year} ${hour}:${minute}`;
    
    //timeDate.innerHTML = ` ${day}, ${month} ${date}, ${year}`;
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



function searchPlace(event) {
    event.preventDefault();
    let newCity = document.querySelector("#search-input");
    //let replaceCity = document.querySelector("#current-city");
    newCity = newCity.value;
    //newCity = newCity.toUpperCase();
    //replaceCity.innerHTML = `Current place: ${newCity}`;

    /* console.log(newCity); */

    function showTemperature(response) {
        event.preventDefault();
        let degree = document.querySelector("#degreeShow");
        let temperature = Math.round(response.data.main.temp);
        degree.innerHTML = `${temperature}`;
        document.querySelector("#current-city").innerHTML = response.data.name;
        document.querySelector("#high-temp").innerHTML = Math.round(response.data.main.temp_max);
        document.querySelector("#low-temp").innerHTML = Math.round(response.data.main.temp_min);
        console.log(response.data);

        document.querySelector("#humidity").innerHTML = response.data.main.humidity;
        document.querySelector("#wind").innerHTML = Math.round(
            response.data.wind.speed);
        document.querySelector("#description").innerHTML =
            response.data.weather[0].main;
        document.querySelector("#current-date").innerHTML = formatDate(response.data.dt * 1000);
        document.querySelector("#current-time").innerHTML = formatTime(response.data.dt * 1000);

    };
    let apiKey = "c7c6992fb4b628387a33963036074203";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndPoint}q=${newCity}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);


}

let button = document.querySelector("button");
button.addEventListener("click", searchPlace);

function showPosition(position) {

    let h3 = document.querySelector("h3");
    let latitude = position.coords.latitude;
    latitude = latitude.toFixed(2);
    let longitude = position.coords.longitude;
    longitude = longitude.toFixed(2);
    console.log(latitude);
    console.log(longitude);
    h3.innerHTML = `Your Latitude is ${latitude} and Your Longitude is ${longitude} `;
}


function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

let gPS = document.querySelector("button1");
gPS.addEventListener("click", getCurrentPosition);
