// import { StyleSheet } from 'react-native';
// import * as Sensors from "expo-sensors";
// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function TabThreeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab Two</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(tabs)/two.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Platform,
// } from "react-native";
// import { LightSensor } from "expo-sensors";

// export default function TabThreeScreen() {
//   const [{ illuminance }, setData] = useState({ illuminance: 0 });

//   useEffect(() => {
//     _toggle();

//     return () => {
//       _unsubscribe();
//     };
//   }, []);

//   const _toggle = () => {
//     if (this._subscription) {
//       _unsubscribe();
//     } else {
//       _subscribe();
//     }
//   };

//   const _subscribe = () => {
//     this._subscription = LightSensor.addListener(setData);
//   };

//   const _unsubscribe = () => {
//     this._subscription && this._subscription.remove();
//     this._subscription = null;
//   };

//   return (
//     <View style={styles.sensor}>
//       <Text>Light Sensor:</Text>
//       <Text>
//         Illuminance:{" "}
//         {Platform.OS === "android"
//           ? `${illuminance} lx`
//           : `Only available on Android`}
//       </Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={_toggle} style={styles.button}>
//           <Text>Toggle</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   buttonContainer: {
//     flexDirection: "row",
//     alignItems: "stretch",
//     marginTop: 15,
//   },
//   button: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#eee",
//     padding: 10,
//   },
//   sensor: {
//     marginTop: 45,
//     paddingHorizontal: 10,
//   },
// });
// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Platform,
// } from "react-native";
// import { LightSensor } from "expo-sensors";

// export default function TabThreeScreen() {
//   const [illuminance, setIlluminance] = useState(0);

//   useEffect(() => {
//     _subscribe();

//     return () => {
//       _unsubscribe();
//     };
//   }, []);

//   const _subscribe = () => {
//     LightSensor.setUpdateInterval(1000);
//     LightSensor.addListener(handleLightChange);
//   };

//   const _unsubscribe = () => {
//     LightSensor.removeAllListeners();
//   };

//   const handleLightChange = (lightData:any) => {
//     setIlluminance(lightData.illuminance);
//   };

//   return (
//     <View style={styles.sensor}>
//       <Text>Light Sensor:</Text>
//       <Text>
//         Illuminance:{" "}
//         {Platform.OS === "android"
//           ? `${illuminance} lx`
//           : `Only available on Android`}
//       </Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={_subscribe} style={styles.button}>
//           <Text>Toggle</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   buttonContainer: {
//     flexDirection: "row",
//     alignItems: "stretch",
//     marginTop: 15,
//   },
//   button: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#eee",
//     padding: 10,
//   },
//   sensor: {
//     marginTop: 45,
//     paddingHorizontal: 10,
//   },
// });
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { LightSensor } from "expo-sensors";

export default function TabThreeScreen() {
  const [illuminance, setIlluminance] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Initial position
  const [subscribed, setSubscribed] = useState(false); // Track subscription status

  useEffect(() => {
    if (subscribed) {
      _subscribe();
    }

    return () => {
      _unsubscribe();
    };
  }, [subscribed]); // Subscribe/unsubscribe based on the subscribed state

  const _subscribe = () => {
    LightSensor.setUpdateInterval(1000);
    LightSensor.addListener(handleLightChange);
  };

  const _unsubscribe = () => {
    LightSensor.removeAllListeners();
  };

  const handleLightChange = (lightData:any) => {
    setIlluminance(lightData.illuminance);

    // Adjust position based on illuminance
    setPosition({ x: 50 + (lightData.illuminance / 100) * 100, y: 50 });
  };

  const toggleSubscription = () => {
    setSubscribed(!subscribed); // Toggle subscription status
  };

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        <Circle cx={position.x} cy={position.y} r="10" fill="blue" />
      </Svg>
      <Text>Light Sensor:</Text>
      <Text>
        Illuminance:{" "}
        {Platform.OS === "android"
          ? `${illuminance} lx`
          : `Only available on Android`}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleSubscription} style={styles.button}>
          <Text>{subscribed ? "Stop" : "Start"} Light Sensor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  svg: {
    position: "absolute",
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
});
