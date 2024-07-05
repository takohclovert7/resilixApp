import React,{useEffect} from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import FloodComponent from '../floodComponent/flood';
import LandComponent from '../floodComponent/landSlide';



const ForcastScreen =({handlePressFlood, handlePressLand})=>{
  
 
    const screenWidth = Dimensions.get('window').width;
    return (
        <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
    >

        <View style={[styles.slide, { width: screenWidth }]}>

       <FloodComponent
        handlePressFlood={handlePressFlood}  
       
        />

        </View>
        <View style={[styles.slide, { width: screenWidth }]}>
          
         <LandComponent   handlePressLand={ handlePressLand}/>

        </View>
        {/* <View style={[styles.slide, { width: screenWidth }]}>
            <Text style={styles.title}>Item 3</Text>
        </View> */}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollViewContent: {
        alignItems: 'center',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#E0E8F9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3E50',
        marginBottom: 20,
      },
});


export default ForcastScreen;