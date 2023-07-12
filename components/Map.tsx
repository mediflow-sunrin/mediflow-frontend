import { StyleSheet, View } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          setLocation(location);
        }
      );
      setLocation(location);
    })();
  }, []);

  return (
    <>
      {location?.coords.latitude && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.coords.latitude ?? 0,
            longitude: location?.coords.longitude ?? 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          provider={PROVIDER_GOOGLE}
        >
          <Marker coordinate={location?.coords as LatLng} />
        </MapView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",

    top: 0,
    position: "absolute",
  },
});
