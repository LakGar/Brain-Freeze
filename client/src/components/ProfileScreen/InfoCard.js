import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import profileImageUrl from "../../../assets/profile4.avif";

const InfoCard = () => {
  const [showMedications, setShowMedications] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

  const medications = [
    { name: "Donepezil", dosage: "10mg" },
    { name: "Memantine", dosage: "20mg" },
    { name: "Rivastigmine", dosage: "6mg" },
    { name: "Galantamine", dosage: "16mg" },
    { name: "Namenda", dosage: "10mg" },
  ];
  const diagnosis = "Vascular Dimentia";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.doctorDetails}>
          <View style={styles.imgNameContianer}>
            <Image source={profileImageUrl} style={styles.profileImage} />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Dr Ryan Sue</Text>
              <Text style={styles.careTakerType}>Geriatric Psychiatrist</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#7a83ff" }]}
          >
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.medicalContainer}>
          <View style={styles.medicationHeader}>
            <Text style={styles.medicationTitle}>Prescriptions</Text>
            <View style={styles.Right}>
              <View style={styles.medicationCountContainer}>
                <Text style={styles.medicationCount}>{medications.length}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowMedications(!showMedications)}
              >
                <Ionicons
                  name={showMedications ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          {showMedications && (
            <View style={styles.medicationList}>
              {medications.map((med, index) => (
                <Text key={index} style={styles.medicationItem}>
                  {med.name} - {med.dosage}
                </Text>
              ))}
            </View>
          )}
        </View>
        <View style={styles.medicationsContainer}>
          <View style={styles.medicationHeader}>
            <Text style={styles.medicationTitle}>Diagnosis</Text>
            <View style={styles.Right}>
              <TouchableOpacity
                onPress={() => setShowDiagnosis(!showDiagnosis)}
              >
                <Ionicons
                  name={showMedications ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          {showDiagnosis && (
            <View style={styles.medicationList}>
              <Text style={styles.medicationItem}>{diagnosis}</Text>
            </View>
          )}
        </View>
        <View style={styles.medicalContainer}>
          <View style={styles.medicationHeader}>
            <Text style={styles.medicationTitle}>Tasks</Text>
            <View style={styles.Right}>
              <View style={styles.medicationCountContainer}>
                <Text style={styles.medicationCount}>9</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowMedications(!showMedications)}
              >
                <Ionicons
                  name={showMedications ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          {showMedications && (
            <View style={styles.medicationList}>
              {medications.map((med, index) => (
                <Text key={index} style={styles.medicationItem}>
                  {med.name} - {med.dosage}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default InfoCard;

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
  doctorDetails: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  imgNameContianer: {
    flex: 0.6,
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
  medicationHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  medicationTitle: {
    flex: 0.7,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    gap: 15,
  },
  Right: {
    flex: 0.2,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  medicationCountContainer: {
    backgroundColor: "gray",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  medicationCount: {
    color: "white",
    fontWeight: "bold",
  },
  medicationList: {
    margin: 10,
  },
  medicationItem: {
    fontSize: 15,
    color: "gray",
    marginVertical: 2,
    fontWeight: "600",
  },
});
