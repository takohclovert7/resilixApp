import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import axios from 'axios';

// Set the public access token
MapboxGL.setAccessToken('pk.eyJ1IjoianVuaW9yNzAiLCJhIjoiY2x5NnB2MmE4MDBiZjJsczh6N3VkMDhzYyJ9.BkLbKUfqkl2xOO45DTgAhQ');

const MyApp1 = () => {
  const [route, setRoute] = useState(null);

//   useEffect(() => {
//     // fetchRoute();
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
        
        {/* Custom image marker for start location */}
        
        <MapboxGL.PointAnnotation
          id="startLocation"
          coordinate={startLocation}
        >

          <Image
            source={require('./images/icons/loca.png')} // Replace with your custom image path
            style={styles.customMarker}
          />
          <MapboxGL.Callout title="Start Location" />
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
      <TouchableOpacity  style={styles.buttonContainer}
      onPress={()=>{handleTrace()}}
      >
        <Text>Street</Text>
      </TouchableOpacity>
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
  customMarker: {
    width: 30,
    height: 30,
    // resizeMode: 'contain', // Adjust as needed
  },
  buttonContainer: {
    alignSelf:"center",
    backgroundColor:"red",
    marginVertical: 40,
    marginHorizontal: 20,
  },
});


export default MyApp1;
