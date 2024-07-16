import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const NewPatientRequests = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.notificationText}>
        You have 5 new patient requests
      </Text>
    </TouchableOpacity>
  );
};

export default NewPatientRequests;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007aff",
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
    marginBottom: 10,
  },

  notificationText: {
    width: "100%",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});
