import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import axios from 'axios';
import LandSlideStatisticsBottom from './landSlideStatisticsBottom';

MapboxGL.setAccessToken('your-mapbox-access-token');
const landslideAffect=[
  {
    id:1,
    coordinate:[9.2665,4.0922]
  }
]
const LandSlideStatistics = ({ location }) => {
  const [route, setRoute] = useState(null);
  const [addressName, setAddressName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const [zoomLevelSet,setZomeLevelSet]=useState(11)

  const zoomIn = () => {
    if (zoomLevelSet < 20) {
        setZomeLevelSet(zoomLevelSet+1);
    }
  };

  const zoomOut = () => {
    if (zoomLevelSet > 0) {
        setZomeLevelSet(zoomLevelSet-1);
    }
  };

  const getHumanReadableAddress = async (latitude, longitude) => {
    setError(false);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      setAddressName(response.data.display_name);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  const fetchRoute = async () => {
    const start = [location.coords.longitude, location.coords.latitude];
    const end = [9.2632, 4.1560]; // Example end coordinates
    const accessToken = 'your-mapbox-access-token';

    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(
          ','
        )}?geometries=geojson&access_token=${accessToken}`
      );
      const routeData = response.data.routes[0].geometry;
      setRoute(routeData);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  useEffect(() => {
    if (location !== 0) {
      getHumanReadableAddress(location.coords.latitude, location.coords.longitude);
    }
  }, [location, reload]);

  const startLocation = [location.coords.longitude, location.coords.latitude];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to fetch address. Network error occurred.</Text>
        <TouchableOpacity
          style={styles.reloadButton}
          onPress={() => setReload(prevState => !prevState)}>
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }
  


  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Street}>
        <MapboxGL.Camera zoomLevel={zoomLevelSet} centerCoordinate={startLocation} pitch={60} heading={20} />

        <MapboxGL.PointAnnotation id="startLocation" coordinate={startLocation}>
          <View style={styles.annotationContainer}>
            <View style={styles.annotationFill} />
          </View>
          <MapboxGL.Callout title="Your Location" />
        </MapboxGL.PointAnnotation>
        {landslideAffect.map((area,index)=>{
          return(
        <MapboxGL.PointAnnotation id={`${area.id}`} coordinate={[9.2665,4.0922]} key={index}
        
           
        >
        <View style={styles.annotationContainer}>
          <View style={[styles.annotationFill,{backgroundColor:"red"}]} />
        </View>
        <MapboxGL.Callout title="Land Slide Arrea" />
      </MapboxGL.PointAnnotation>
          )
        })}

        {route && (
          <MapboxGL.ShapeSource id="routeSource" shape={route}>
            <MapboxGL.LineLayer id="routeLayer" style={{ lineColor: 'red', lineWidth: 10 }} />
          </MapboxGL.ShapeSource>
        )}

        <MapboxGL.VectorSource id="composite" url="mapbox://mapbox.mapbox-terrain-v2">
          <MapboxGL.FillExtrusionLayer
            id="building-3d"
            sourceLayer="building"
            filter={['==', 'extrude', 'true']}
            style={{
              fillExtrusionColor: '#aaa',
              fillExtrusionHeight: ['get', 'height'],
              fillExtrusionBase: ['get', 'min_height'],
              fillExtrusionOpacity: 0.6,
            }}
          />
        </MapboxGL.VectorSource>
      </MapboxGL.MapView>
      <View  style={{position:"absolute",top:"85",left:"83%",marginTop:5}}>
        {/* Zoom In Button */}
        <TouchableOpacity style={[styles.zoomButton]}  onPress={zoomOut} >
        <Image 
         source={require("../../images/icons/minus-sign.png")}
          style={styles.image}
         />

        </TouchableOpacity>

        {/* Zoom Out Button */}
        <TouchableOpacity style={[styles.zoomButton]} onPress={zoomIn}>
         <Image 
         source={require("../../images/icons/add-icon.png")}
          style={styles.image}
         />

        </TouchableOpacity>
      </View>
      <LandSlideStatisticsBottom location={location} addressName={addressName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#00f',
    transform: [{ scale: 0.6 }],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reloadButton: {
    marginTop: 10,
    width: 90,
    height: 35,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },
  zoomButton: {
 
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 2,
    width: 50,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent:"center"
    
  },
 
  image:{
    width:25,
    height:22,
   alignSelf:"center",
   tintColor:"rgba(0, 113, 206,0.9)"

  }
});

export default LandSlideStatistics;
