import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppointmentTimeline from "./AppointmentTimeline";

const PatientCard = ({ patient, onPress }) => {
  const profileImageUrl =
    patient.profilePicture === "default-profile-pic.jpg"
      ? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
      : patient.profilePicture;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(patient)}>
      <View style={styles.header}>
        <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.cardTitle}>
            {patient.firstName} {patient.lastName}
          </Text>
          <Text style={styles.subTitle}>{patient.email}</Text>
        </View>
        <Ionicons name="checkmark-circle" size={34} color="#007AFF" />
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={20} color="darkblue" />
          <Text style={styles.statText}>2 Times</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="cash-outline" size={20} color="green" />
          <Text style={styles.statText}>$62104</Text>
        </View>
      </View>
      <AppointmentTimeline patientId={patient._id} />
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.scheduleButton]}>
          <Text style={styles.buttonText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.reportButton]}>
          <Text style={styles.buttonText}>Download Report</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    borderColor: "lightgrey",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subTitle: {
    color: "grey",
    fontSize: 12,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  scheduleButton: {
    backgroundColor: "#007AFF",
  },
  reportButton: {
    backgroundColor: "#A1A1A1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PatientCard;
