import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function TabOneScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      // Start watching for location updates
      const subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 }, // Update every 10 meters
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      // Return a cleanup function to stop watching location when the component unmounts
      return () => {
        if (subscription.remove) {
          subscription.remove();
        }
      };
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {location && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
