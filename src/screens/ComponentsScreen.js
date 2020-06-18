import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ComponentsScreen = () => {
  const name = "Poop"
  return (
    <View>
      <Text style={styles.foo}>Ayo</Text>
      <Text style={styles.bar}>Hey its {name}</Text>
      <Text>FTP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  foo: {
    fontSize: 50,
  },
  bar: {
    fontSize: 15,
  },
});

export default ComponentsScreen
