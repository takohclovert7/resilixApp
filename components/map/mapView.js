import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import axios from 'axios';
import DisasterCard from '../menuComponent/viewDetailAboutADisaster_card';

// Set the public access token
MapboxGL.setAccessToken('pk.eyJ1IjoianVuaW9yNzAiLCJhIjoiY2x5NnB2MmE4MDBiZjJsczh6N3VkMDhzYyJ9.BkLbKUfqkl2xOO45DTgAhQ');

const MyMap = ({addressName,disaster,distance}) => {
  const [route, setRoute] = useState(null);

//   useEffect(() => {
//     fetchRoute();
//   }, []);

function handleTrace(){
    fetchRoute()
}

  const fetchRoute = async () => {
    const start = [9.3590, 4.0786]; // Replace with start coordinates
    const end = [9.2632, 4.1560];   // Replace with end coordinates
    const accessToken = 'pk.eyJ1IjoianVuaW9yNzAiLCJhIjoiY2x5NnB2MmE4MDBiZjJsczh6N3VkMDhzYyJ9.BkLbKUfqkl2xOO45DTgAhQ';

    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?geometries=geojson&access_token=${accessToken}`
      );
      const routeData = response.data.routes[0].geometry;
      setRoute(routeData);
    } catch (error) {
      console.error(error);
    }
  };

  const startLocation = [9.3590, 4.0786]; // Replace with your start coordinates

  return (
    
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Street}>
        <MapboxGL.Camera
          zoomLevel={15}
          centerCoordinate={startLocation} // Center map on start location
          pitch={60}
          heading={20}
        />
        
        {/* Marker for start location */}
        <MapboxGL.PointAnnotation
          id="startLocation"
          coordinate={startLocation}
        >
          <View style={styles.annotationContainer}>
            <View style={styles.annotationFill} />
          </View>
          <MapboxGL.Callout title="Your Location" />
        </MapboxGL.PointAnnotation>

        {route && (
          <MapboxGL.ShapeSource id="routeSource" shape={route}>
            <MapboxGL.LineLayer
              id="routeLayer"
              style={{
                lineColor: 'red', // Blue color
                lineWidth: 10,
              }}
            />
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
     <DisasterCard addressName={addressName}  disaster={disaster}   distance={distance}  handleTrace={ handleTrace}  />
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
//   flex:1
width:"100%",
height:"100%"
   
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 40,
    height: 30,
    // resizeMode: 'contain', // Adjust as needed
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
    backgroundColor: '#00f', // Blue color
    transform: [{ scale: 0.6 }],
  },

});


export default MyMap;
