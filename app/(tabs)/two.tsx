import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabTwoScreen() {
  const [steps, setSteps] = useState(0);
  const x = 0.1;
  const y = 0.2;
  const z = 0.3;

  const handleToggle = () => {
    setSteps((prevSteps) => prevSteps + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer</Text>
      <Text style={styles.staticText}>Values:</Text>
      <Text style={styles.staticText}>x: {x}</Text>
      <Text style={styles.staticText}>y: {y}</Text>
      <Text style={styles.staticText}>z: {z}</Text>

      <TouchableOpacity style={styles.button} onPress={handleToggle}>
        <Text>Toggle</Text>
      </TouchableOpacity>

      <Text style={styles.stepsText}>Steps: {steps}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff"
  },
  staticText: {
    marginBottom: 10,
    color: "#ccc"
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: "#ccc"
  },
  button: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  stepsText: {
    marginTop: 20,
    fontSize: 16,
  },
});
