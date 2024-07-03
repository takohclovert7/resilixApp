// // index.js

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import BackgroundService from 'react-native-background-actions';
// import { requestLocationPermission, getCurrentLocation } from './LocationService'; // Import location service functions

// const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// const veryIntensiveTask = async (taskDataArguments) => {
//   const { delay } = taskDataArguments;

//   await new Promise(async (resolve) => {
//     for (let i = 0; BackgroundService.isRunning(); i++) {
//       try {
//         // Request location permission if not granted
//         const granted = await requestLocationPermission();
//         if (granted) {
//           const position = await getCurrentLocation();
//           console.log('[BackgroundService] Current position:', position);
//           // Process position data here
//         } else {
//           console.error('[BackgroundService] Location permission denied');
//         }
//       } catch (error) {
//         console.error('[BackgroundService] Error fetching position:', error);
//         // Handle location errors
//       }

//       await sleep(delay);
//     }
//     resolve();
//   });
// };

// const startBackgroundTask = async () => {
//   const options = {
//     taskName: 'ExampleTask',
//     taskTitle: 'Example Task Title',
//     taskDesc: 'Example Task Description',
//     taskIcon: {
//       name: 'ic_launcher',
//       type: 'mipmap',
//     },
//     color: '#ff00ff',
//     parameters: {
//       delay: 6000, // Adjust delay as needed (in milliseconds)
//     },
//   };

//   try {
//     await BackgroundService.start(veryIntensiveTask, options);
//     console.log('[BackgroundService] Task started successfully');
//   } catch (error) {
//     console.error('[BackgroundService] Failed to start task:', error);
//   }
// };

// const MainApp = () => {
//   // Start your background task when the component mounts
//   startBackgroundTask();

//   return <App />;
// };

AppRegistry.registerComponent(appName, () => App );
