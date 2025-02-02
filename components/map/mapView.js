import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import axios from 'axios';
import DisasterCard from '../menuComponent/viewDetailAboutADisaster_card';

// Set the public access token
MapboxGL.setAccessToken('pk.eyJ1IjoianVuaW9yNzAiLCJhIjoiY2x5NnB2MmE4MDBiZjJsczh6N3VkMDhzYyJ9.BkLbKUfqkl2xOO45DTgAhQ');

const MyMap = ({addressName,disaster,distance,latitude,longitude}) => {
  const [route, setRoute] = useState(null);
  const [zoomLevelSet,setZomeLevelSet]=useState(15)

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
  useEffect(() => {
    // fetchRoute();
    // console.log(latitude,longitude)
  }, []);

function handleTrace(){
    fetchRoute()
}

  const fetchRoute = async () => {
    const start = [longitude, latitude]; // Replace with start coordinates
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

  const startLocation = [longitude, latitude]; // Replace with your start coordinates

  return (
    
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Street}>
        <MapboxGL.Camera
          zoomLevel={zoomLevelSet}
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


export default MyMap;
