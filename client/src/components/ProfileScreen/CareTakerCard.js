import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import profileImageUrl from "../../../assets/profile3.avif";

const CareTakerCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imgNameContianer}>
          <Image source={profileImageUrl} style={styles.profileImage} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}> Lakshay Garg</Text>
            <Text style={styles.careTakerType}>Caregiver</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#7a83ff" }]}
          >
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#bdd2ff" }]}
          >
            <Text style={[styles.buttonText, { color: "#7a83ff" }]}>Rate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CareTakerCard;

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
    flexDirection: "column",
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
    flexDirection: "row",
    width: "100%",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
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
