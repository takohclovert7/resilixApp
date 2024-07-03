import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image,Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import fetchWeatherByDateTime from "../../components/weatherForcastApi/api";
import { PredictFloodBottom } from './predictFloadBottom';

const PredictFlood = ({ handleFloodPerdayRoute ,location}) => {
    
  function getFormattedDate() {
    const currentDate = new Date();
    const formatString = 'MMMM, do yyyy';

    function getMonthName(month) {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      return monthNames[month];
    }

    function getOrdinalSuffix(day) {
      const suffixes = ["st", "nd", "rd", "th"];
      const remainder = day % 10;
      return (day < 10 || day > 20) ? (remainder === 1 && day !== 11 ? suffixes[0] : remainder === 2 && day !== 12 ? suffixes[1] : remainder === 3 && day !== 13 ? suffixes[2] : suffixes[3]) : suffixes[3];
    }

    const month = getMonthName(currentDate.getMonth());
    const day = currentDate.getDate();
    const ordinalSuffix = getOrdinalSuffix(day);
    const year = currentDate.getFullYear();
    const formattedDate = `${month}, ${day}${ordinalSuffix} ${year}`;

    return formattedDate;
  }

  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [todayDate, setTodayDate] = useState(null);

  function getHourFromDateTime(dateTime) {
    let hour = parseInt(dateTime.split(' ')[1].split(":")[0]);
    let amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert to 12-hour format (adjust for 00 as 12 AM)
    return `${hour} ${amPm}`;
  }
  const { currentDate, currentTime } = getCurrentDateTime();

  useEffect(() => {

    if(location===0){
      // console.log(location)
    }else{
    const fetchData = async () => {
      setShowError(false);
      try {
        const weatherData = await fetchWeatherByDateTime(location.coords.latitude, location.coords.longitude, currentDate, currentTime,-3,3);
        setWeatherData(weatherData);
        setLoading(false);
        setShowError(false);
      } catch (error) {
       
        setLoading(false);
        setShowError(true);
      
      }
    };
    fetchData();
    }
  }, []);

  function getCurrentDateTime() {
    // Get the current date and time
    const currentDate = new Date();

    // Format the date as 'yyyy-mm-dd'
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const currentDateString = `${year}-${month}-${day}`;

    // Format the time as 'hh:mm:ss'
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const currentTimeString = `${hours}:${minutes}:${seconds}`;

    return {
        currentDate: currentDateString,
        currentTime: currentTimeString
    };
}





  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching Weather data...</Text>
      </View>
    );
  }

  if (showError ||weatherData.length<0 ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error fetching weather data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { textAlign: "center", marginBottom: 15 }]}>Predict Flood</Text>
        <View style={styles.card}>
          <Text style={[styles.date, { color: "#A098AE" }]}>{weatherData[3].description}</Text>
          <Text style={styles.date}>{getFormattedDate()}</Text>
          <View style={styles.timeRow}>
            <View style={styles.timeBox}>
              <Text style={styles.time}>{getHourFromDateTime(weatherData[1].time)}</Text>

              <Image
        source={{ uri: `http://openweathermap.org/img/wn/${weatherData[1].iconCode}@2x.png` }}
        style={styles.image}
      />

              <Text style={styles.temp}>{`${weatherData[1].temperature} °C`}</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.time}>{getHourFromDateTime(weatherData[2].time)}</Text>
             
              <Image
        source={{ uri: `http://openweathermap.org/img/wn/${weatherData[2].iconCode}@2x.png` }}
        style={styles.image}
      />
              <Text style={styles.temp}>{`${weatherData[2].temperature} °C`}</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.time}>{getHourFromDateTime(weatherData[3].time)}</Text>
            
              <Image
        source={{ uri: `http://openweathermap.org/img/wn/${weatherData[3].iconCode}@2x.png` }}
        style={styles.image}
      />
              <Text style={styles.temp}>{`${weatherData[3].temperature} °C`}</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.time}>{getHourFromDateTime(weatherData[4].time)}</Text>
              
              <Image
        source={{ uri: `http://openweathermap.org/img/wn/${weatherData[4].iconCode}@2x.png` }}
        style={styles.image}
      />
              <Text style={styles.temp}>{`${weatherData[4].temperature} °C`}</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.time}>{getHourFromDateTime(weatherData[5].time)}</Text>
            
              <Image
        source={{ uri: `http://openweathermap.org/img/wn/${weatherData[5].iconCode}@2x.png` }}
        style={styles.image}
      />
              <Text style={styles.temp}>{`${weatherData[5].temperature} °C`}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Forecast</Text>
        <View style={styles.card}>
          <Text style={[styles.date, { color: "#A098AE" }]}>{weatherData[3].description}</Text>
          <Text style={styles.date}>{getFormattedDate()}</Text>
         <PredictFloodBottom  handleFloodPerdayRoute={handleFloodPerdayRoute}  location={location} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    height: "100%",
    marginBottom: 110
  },
  section: {
    margin: 16,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "black"
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "#363B64",
    textTransform: "capitalize"
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeBox: {
    alignItems: 'center',
  },
  time: {
    fontSize: 11,
    color: '#A098AE',
  },
  temp: {
    fontSize: 12,
    fontWeight: 'bold',
  },
 
  forecastTemp: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image:{
  height:52,
  width:50
  }
});

export default PredictFlood;
