import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:8000/api/tasks/appointments";

const AppointmentTimeline = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}/${patientId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId, userToken]);

  const currentDate = new Date();

  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.dueAt) < currentDate
  );

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.dueAt) >= currentDate
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.timeline}>
      {pastAppointments.length > 0 ? (
        pastAppointments.slice(0, 3).map((appointment) => (
          <View key={appointment._id} style={styles.timelineItem}>
            <Text style={styles.timelineDate}>
              {new Date(appointment.dueAt).toLocaleDateString()}
            </Text>
            <Text style={styles.timelineTitle}>{appointment.title}</Text>
            <Text style={styles.timelineSubtitle}>
              {appointment.description}
            </Text>
            <View style={styles.ball}></View>
          </View>
        ))
      ) : (
        <Text style={styles.noAppointmentsText}>No past appointments.</Text>
      )}
      {upcomingAppointments.length > 0 && (
        <Text style={styles.upcomingText}>
          {upcomingAppointments.length} upcoming appointment(s).
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    marginVertical: 10,
  },
  timelineItem: {
    borderLeftWidth: 2,
    borderLeftColor: "lightgrey",
    paddingLeft: 10,
    paddingVertical: 10,
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
  noAppointmentsText: {
    fontSize: 14,
    color: "grey",
    width: "100%",
    textAlign: "center",
    marginTop: 10,
  },
  upcomingText: {
    fontSize: 14,
    color: "grey",
    fontWeight: "bold",
  },
  ball: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "#007AFF",
    top: "72.9%",
    left: -9,
    transform: [{ translateY: -7.5 }],
  },
});

export default AppointmentTimeline;
