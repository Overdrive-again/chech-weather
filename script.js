const apiKey = '1051016c2ba82db0af421934639ae8fd'
const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const weatherInfoSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const forecastContainer = document.createElement('div');  
const countryTxt = document.querySelector('.country-text');
const tempText = document.querySelector('.temp-text');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const CurrentDateTxt = document.querySelector('.current-date-txt')
searchBtn.addEventListener('click', ()=>{
    if (cityInput.value.trim() != ''){
        UpdateWeatherInfo(cityInput.value)
        cityInput.value=''
        cityInput.blur()
    }
})
cityInput.addEventListener('keydown', (event)=>{
    if (cityInput.value.trim() != '' && event.key == 'Enter'){
        UpdateWeatherInfo(cityInput.value)
        cityInput.value=''
        cityInput.blur()
    }
})
async function getFetchData(type, city){
    //const apiUrl = 'https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=1051016c2ba82db0af421934639ae8fd'; !!Not working for some reason!!
    const apiUrl = 'https://api.openweathermap.org/data/2.5/'+type+'?q='+city+'&appid='+apiKey+'&units=metric';
    const response= await fetch(apiUrl);
    return response.json();
}


function getWeatherIcon(id){
    if (id <= 232) return 'thunderstorm.svg';
    if (id <= 321) return 'drizzle.svg';
    if (id <= 531) return 'rain.svg';
    if (id <= 622) return 'snow.svg';
    if (id <= 781) return 'atmosphere.svg';
    if (id <= 800) return 'clear.svg';
    else return 'clouds.svg'
}
function getCurrentDate(){
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day:'2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-GB', options)
}
async function UpdateWeatherInfo(city){
    const weatherData = await getFetchData('weather', city);
    if(weatherData.cod !=200){
        showDiaplaySection(notFoundSection)
        return
    }
    showDiaplaySection(weatherInfoSection)
    // console.log(weatherData)
    const {
        name: country,
        main: { temp, humidity },
        weather: [{id, main }],
        wind: {speed}

    } = weatherData

    countryTxt.textContent = country
    tempText.textContent= Math.round(temp) + '°C'
    conditionTxt.textContent = main
    humidityValueTxt.textContent = humidity + '%'
    windValueTxt.textContent = speed + 'M/s'
    CurrentDateTxt.textContent= getCurrentDate()
    weatherSummaryImg.src='assets/weather/'+getWeatherIcon(id);

    showDiaplaySection(weatherInfoSection)

}

async function updateForecastInfo(){
    const forecastsData= await getFetchData('forecast', city)
    console.log(forecastsData)
    // const timeTaken= '12:00:00';
    // const todayDate = new Date().toISOString().split('T')[0];
    // console.log(forecastsData)
    // forecastsData.list.forEach(forecastWeather => {
    //     console.log(forecastWeather)
    // })
}


function showDiaplaySection(section){
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none')
    section.style.display ='flex'
}









// searchBtn.addEventListener('click', () => {
//     const city = cityInput.value;
//     if (!city) return;

  
//     const geocodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

//     return fetch(geoUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('City not found');
//             }
//             return response.json();
//         })
//         .then(locationData => {
//             // If no location data is returned, throw an error
//             if (locationData.length === 0) {
//                 throw new Error('City not found');
//             }

//             const { lat, lon, name, country } = locationData[0];

           
//             const forecastApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;

//             return fetch(forecastApiUrl).then(response => response.json()).then(forecastData => {
//                 updateWeatherInfo(forecastData, name, country);
//                 updateForecastInfo(forecastData);
//             });
//         })
//         .catch(error => console.error('Error fetching weather data:', error));
// });

// function updateWeatherInfo(data, cityName, countryCode) {
    // const countryText = document.querySelector('.country-text');
    // const tempText = document.querySelector('.temp-text');
    // const conditionText = document.querySelector('.condition-txt');
    // const humidityText = document.querySelector('.humidity-value-txt');
    // const windText = document.querySelector('.wind-value-txt');


//     const currentWeather = data.current;

//     countryText.textContent = `${cityName}, ${countryCode}`;
//     tempText.textContent = `${Math.round(currentWeather.temp)} °C`;
//     conditionText.textContent = currentWeather.weather[0].description;
//     humidityText.textContent = `${currentWeather.humidity}%`;
//     windText.textContent = `${currentWeather.wind_speed} m/s`;

    
//     notFoundSection.style.display = 'none';
//     searchCitySection.style.display = 'none';
//     weatherInfoSection.style.display = 'block';
// }

// function updateForecastInfo(data) {
  
//     forecastContainer.innerHTML = '';

//     const dailyForecast = data.daily.slice(1, 4); 

//     dailyForecast.forEach(day => {
//         const forecastDate = new Date(day.dt * 1000).toLocaleDateString();
//         const tempDay = Math.round(day.temp.day);
//         const tempNight = Math.round(day.temp.night);
//         const description = day.weather[0].description;

//         const forecastHTML = `
//             <div class="forecast-day">
//                 <h5>${forecastDate}</h5>
//                 <p>Day: ${tempDay} °C, Night: ${tempNight} °C</p>
//                 <p>${description}</p>
//             </div>
//         `;

//         forecastContainer.innerHTML += forecastHTML;
//     });

 
//     weatherInfoSection.appendChild(forecastContainer);
// }
