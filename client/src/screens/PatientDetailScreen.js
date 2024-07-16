import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have installed the @expo/vector-icons package
import Metrics from "../components/HomeScreenComponents/Metrics";
import AppointmentTimeline from "../components/Dashboard/AppointmentTimeline";
import Medications from "../components/Dashboard/Medications";

const screenWidth = Dimensions.get("window").width;

const PatientDetailScreen = ({ route, navigation }) => {
  const { patient } = route.params;

  const profileImageUrl =
    patient.profilePicture === "default-profile-pic.jpg"
      ? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
      : patient.profilePicture;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.cardTitle}>
            {patient.firstName} {patient.lastName}
          </Text>
          <Text style={styles.subTitle}>{patient.email}</Text>
        </View>
        <Ionicons name="checkmark-circle" size={44} color="#007AFF" />
      </View>
      <ScrollView style={styles.card}>
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

        <View style={styles.timeline}>
          <Text style={styles.cardTitle}>Medical Information</Text>
          <View style={{ height: 10 }}></View>

          <Medications patientId={patient._id} />
        </View>
        <View style={styles.timeline}>
          <Text style={styles.cardTitle}>Last Visits</Text>
          <View style={{ height: 10 }}></View>

          <AppointmentTimeline patientId={patient._id} />
        </View>

        <Metrics userInfo={patient} />
      </ScrollView>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.scheduleButton]}
          onPress={() => navigation.navigate("CaretakerAddTask", { patient })}
        >
          <Text style={styles.buttonText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.reportButton]}>
          <Text style={styles.buttonText}>Download Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatientDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "fcenter",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: "rgba(213,217,234,0.1)",
  },
  card: {
    flex: 1,
    gap: 0,
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
    width: "100%",
    gap: 20,
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 6,
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
    padding: 10,
    backgroundColor: "white",
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
  },
  details: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
    flex: 1,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 255,0.2)",
    padding: 5,
    borderRadius: 5,
  },
  timeline: {
    marginTop: 5,
    marginVertical: 10,
    width: screenWidth - 40,
    flexDirection: "column",
    borderRadius: 6,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 20,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "white",
  },
  timelineItem: {
    borderLeftWidth: 2,
    paddingLeft: 20,
    padding: 10,
    width: "100%",
    borderColor: "grey",
    position: "relative",
  },
  timelineDate: {
    fontSize: 12,
    color: "grey",
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  timelineSubtitle: {
    fontSize: 12,
    color: "grey",
  },
  ball: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    backgroundColor: "white",
    top: "50%",
    left: -7.5,
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
