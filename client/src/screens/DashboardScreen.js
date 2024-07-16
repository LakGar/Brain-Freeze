import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserInfo } from "../store/authSlice";
import PatientCard from "../components/Dashboard/PatientCard";

const API_URL = "http://localhost:8000/api/users/patient-details"; // Update with your backend URL

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userToken, userInfo } = useSelector((state) => state.auth);
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [patientError, setPatientError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
    }
  }, [dispatch, userToken, userInfo]);

  useEffect(() => {
    if (userInfo && userInfo.patients && userInfo.patients.length > 0) {
      fetchPatientDetails(userInfo.patients);
    }
  }, [userInfo]);

  useEffect(() => {
    setFilteredPatients(
      patients.filter((patient) =>
        `${patient.firstName} ${patient.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, patients]);

  const fetchPatientDetails = async (patientIds) => {
    setLoadingPatients(true);
    try {
      const response = await axios.post(
        API_URL,
        { patientIds },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setPatients(response.data);
    } catch (error) {
      setPatientError(
        error.response?.data?.message || "Failed to load patients"
      );
    } finally {
      setLoadingPatients(false);
    }
  };

  const handlePatientPress = (patient) => {
    navigation.navigate("PatientDetail", { patient });
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <View style={{ flex: 1, width: "100%" }}>
          <Text style={styles.title}>Your Patients</Text>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Patients"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {loadingPatients ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : patientError ? (
            <Text>{patientError}</Text>
          ) : filteredPatients.length > 0 ? (
            <ScrollView>
              <View style={styles.patientCardContainer}>
                {filteredPatients.map((patient, index) => (
                  <PatientCard
                    key={index}
                    patient={patient}
                    user={userInfo}
                    onPress={handlePatientPress}
                  />
                ))}
              </View>
            </ScrollView>
          ) : (
            <Text>No patients found</Text>
          )}
        </View>
      ) : (
        <Text>Loading user information...</Text>
      )}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "rgba(213,217,234,0.1)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    textAlign: "center",
    color: "#007AFF",
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 20,
    width: "96%",
  },
  patientCardContainer: {
    width: "100%",
    flexDirection: "column",
  },
});
