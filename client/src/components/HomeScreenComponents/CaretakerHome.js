import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UpcomingAppt from "../CaretakerHome/UpcomingAppt";
import NewPatientRequests from "./NewPatientRequests";
import PatientsStatus from "./PatientsStatus";

const CaretakerHome = ({ userInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome {userInfo.firstName},</Text>
      <UpcomingAppt userInfo={userInfo} />
      <NewPatientRequests userInfo={userInfo} />
      <PatientsStatus userInfo={userInfo} />
    </View>
  );
};

export default CaretakerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingHorizontal: 20,
    width: "100%",
    textAlign: "left",
  },
});
