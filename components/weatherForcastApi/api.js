import axios from 'axios';

function convertDateFormat(dateTimeString) {
  // Create a new Date object from the ISO 8601 formatted string
  let date = new Date(dateTimeString);

  // Get date components
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
  let day = ('0' + date.getDate()).slice(-2);
  let hours = ('0' + date.getHours()).slice(-2);
  let minutes = ('0' + date.getMinutes()).slice(-2);
  let seconds = ('0' + date.getSeconds()).slice(-2);

  // Construct the desired format
  let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

const apiKey = '191bc27a69ea3067e1f53ba05e917755'; // Replace with your actual API key

const fetchWeatherByDateTime = (lat, lon, targetDate, targetTime,minTime,maxTime) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(response => {
        const data = response.data;
        const forecasts = findForecastsInRange(data.list, targetDate, targetTime,minTime,maxTime);
        const formattedForecasts = formatForecasts(forecasts);
        resolve(formattedForecasts);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        reject(error); // Reject the promise with the error
      });
  });
};

const findForecastsInRange = (forecasts, targetDate, targetTime,minTime,maxTime) => {
  const targetDateTime = new Date(`${targetDate}T${targetTime}`);
  const forecastsInRange = [];

  // Generate times for targetTime-3, targetTime-2, targetTime-1, targetTime, targetTime+1, targetTime+2, targetTime+3
  for (let i = minTime; i <= maxTime; i++) {
    const hourDateTime = new Date(targetDateTime.getTime() + i * 60 * 60 * 1000);
    const forecast = findClosestForecast(forecasts, hourDateTime);
  
    forecastsInRange.push(forecast);
  }

  return forecastsInRange;
};

const findClosestForecast = (forecasts, targetDateTime) => {
  let closestForecast = null;
  let minDiff = Infinity;

  forecasts.forEach(forecast => {
    const forecastDateTime = new Date(forecast.dt_txt);
    const diff = Math.abs(forecastDateTime - targetDateTime);
    if (diff < minDiff) {
      minDiff = diff;
      closestForecast = { ...forecast };
      closestForecast.dt_txt = convertDateFormat(targetDateTime);
    }
  });

  return closestForecast;
};

const formatForecasts = (forecasts) => {
 
  return forecasts.map(forecast => ({
    time: forecast.dt_txt,
    temperature: forecast.main.temp,
    description: forecast.weather[0].description,
    iconCode: forecast.weather[0].icon,
    humidity: forecast.main.humidity,
  }));
};

export default fetchWeatherByDateTime;
