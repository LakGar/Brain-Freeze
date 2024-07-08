import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import profileImageUrl from "../../../assets/profile1.avif";

const EmergencyContact = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imgNameContianer}>
          <Image source={profileImageUrl} style={styles.profileImage} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}> Jane Smith</Text>
            <Text style={styles.careTakerType}>Emergency contact</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ff4d4d" }]}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmergencyContact;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  imgNameContianer: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  nameContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  careTakerType: {
    fontSize: 14,
    color: "gray",
  },

  button: {
    flex: 0.3,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
