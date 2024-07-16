import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PatientsStatus = () => {
  return (
    <View style={styles.container}>
      <Text>PatientsStatus</Text>
    </View>
  );
};

export default PatientsStatus;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "lightgrey",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 20,
  },
});
