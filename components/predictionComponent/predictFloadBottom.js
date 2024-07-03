import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image,Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import fetchWeatherByDateTime from "../../components/weatherForcastApi/api";

export function PredictFloodBottom({handleFloodPerdayRoute,location}){

    const [loading, setLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const [forecastData, setForecastData] = useState(null);

    const getNext7Days = () => {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        const days = [];
      
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
      
          const dayName = weekdays[date.getDay()];
          const temp = '72° / 28°'; // Hardcoded temperature for example purposes
          const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; // Format: YYYY-MM-DD
      
          days.push({ day: dayName, temp, date: formattedDate });
        }
      
        return days;
      };
      
    

      const fetchWeatherForDay = async (date,day) => {
      
        try {
          // Example function to fetch weather data by date
          const weatherData = await fetchWeatherByDateTime(location.coords.latitude, location.coords.longitude, date,"12:00:00",-3,3);
          return { day,date, weather: weatherData }; // Return date and weather data for the day
        } catch (error) {
          console.error(`Error fetching weather data for ${date}:`, error);
          return { date, weather: null }; // Return null or handle error as needed
        }
      };






      useEffect(() => {
        const fetchWeatherData = async () => {
          try {
            const next7Days = getNext7Days(); // Get the next 7 days' data
            const promises = next7Days.map(day => fetchWeatherForDay(day.date,day.day)); // Map each day to a weather fetch promise
    
            const weatherData = await Promise.all(promises); // Fetch weather data for all days concurrently
    
            setForecastData(weatherData);
            setLoading(false);
            setShowError(false);
          } catch (error) {
            console.error('Error fetching weather data:', error);
            setLoading(false);
            setShowError(true);
          }
        };
    
        fetchWeatherData();
     
      }, []);




      if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Fetching Forcast data</Text>
          </View>
        );
      }


    return (
<>
{forecastData && forecastData.map((day, index) => (
   
            <TouchableOpacity key={index} style={styles.forecastRow} onPress={()=>{
                 const data ={
                    day:day.day,
              intTemp:day.weather[0].temperature,
              finalTemp:day.weather[6].temperature,
              humidity:day.weather[3].humidity,
              description:day.weather[3].description,
              date:day.date
              
                 }
                handleFloodPerdayRoute(data)
            }}>
              <View style={{ flexDirection: "row", marginLeft: 10 }}>
                <Image
        source={{ uri: `http://openweathermap.org/img/wn/${day.weather[3].iconCode}@2x.png` }}
        style={{
            width:33,
            height:40,
            bottom:6,
            marginRight:8
        }}
      />
           


                <Text style={styles.forecastDay}>{day.day}</Text>
              </View>
              <Text style={styles.forecastTemp}>{day.weather ? `${day.weather[0].temperature}° / ${day.weather[6].temperature}°` : 'N/A'}</Text>
            </TouchableOpacity>
          ))}
</>
    )
}


const styles = StyleSheet.create({

    forecastRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
      },
      forecastDay: {
        fontSize: 16,
      },

})