import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:8000/api"; // Update with your backend URL

const Medications = ({ patientId }) => {
  console.log(patientId);
  const [medicalInfo, setMedicalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const userToken = useSelector((state) => state.auth.userToken);

  const fetchMedicalInfo = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/users/medical-information/${patientId}`
      );
      setMedicalInfo(response.data);
    } catch (error) {
      console.error("Error fetching medical information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicalInfo();
  }, [patientId]);

  const handleSave = async () => {
    try {
      await axios.post(
        `${API_URL}/users/${patientId}/medical-information`,
        medicalInfo,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      Alert.alert("Success", "Medical information updated successfully");
      setEditing(false);
    } catch (error) {
      console.error("Error saving medical information:", error);
      Alert.alert("Error", "Failed to update medical information");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const profileImageUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {medicalInfo ? (
        <View>
          {editing ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Primary Doctor Name"
                value={medicalInfo.primaryDoctor?.name || ""}
                onChangeText={(text) =>
                  setMedicalInfo({
                    ...medicalInfo,
                    primaryDoctor: { ...medicalInfo.primaryDoctor, name: text },
                  })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Primary Doctor Contact"
                value={medicalInfo.primaryDoctor?.contact || ""}
                onChangeText={(text) =>
                  setMedicalInfo({
                    ...medicalInfo,
                    primaryDoctor: {
                      ...medicalInfo.primaryDoctor,
                      contact: text,
                    },
                  })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Medical Conditions (comma separated)"
                value={medicalInfo.medicalConditions?.join(", ") || ""}
                onChangeText={(text) =>
                  setMedicalInfo({
                    ...medicalInfo,
                    medicalConditions: text
                      .split(",")
                      .map((item) => item.trim()),
                  })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Medications (name, dosage, frequency)"
                value={
                  medicalInfo.medications
                    ?.map(
                      (med) => `${med.name}, ${med.dosage}, ${med.frequency}`
                    )
                    .join("; ") || ""
                }
                onChangeText={(text) =>
                  setMedicalInfo({
                    ...medicalInfo,
                    medications: text.split(";").map((med) => {
                      const [name, dosage, frequency] = med.split(",");
                      return {
                        name: name.trim(),
                        dosage: dosage.trim(),
                        frequency: frequency.trim(),
                      };
                    }),
                  })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Allergies (comma separated)"
                value={medicalInfo.allergies?.join(", ") || ""}
                onChangeText={(text) =>
                  setMedicalInfo({
                    ...medicalInfo,
                    allergies: text.split(",").map((item) => item.trim()),
                  })
                }
              />
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.doctorDetails}>
                <View style={styles.imgNameContianer}>
                  <Image
                    source={{ uri: profileImageUrl }}
                    style={styles.profileImage}
                  />
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>
                      {medicalInfo.primaryDoctor?.name}
                    </Text>
                    <Text style={styles.careTakerType}>Primary Doctor</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.buttonSmall}>
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Message
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Medical Conditions</Text>
                <Text style={styles.infoText}>
                  {medicalInfo.medicalConditions?.join(", ")}
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Medications</Text>
                <Text style={styles.infoText}>
                  {medicalInfo.medications
                    ?.map(
                      (med) => `${med.name} - ${med.dosage} - ${med.frequency}`
                    )
                    .join("; ")}
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Allergies</Text>
                <Text style={styles.infoText}>
                  {medicalInfo.allergies?.join(", ")}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setEditing(true)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View>
          <Text>No medical information available. Please add details.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.buttonText}>Add Medical Information</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Medications;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonSmall: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  doctorDetails: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginVertical: 5,
  },
  imgNameContianer: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  nameContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  careTakerType: {
    fontSize: 12,
    color: "gray",
  },
  infoSection: {
    marginVertical: 10,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "grey",
  },
  infoText: {
    fontSize: 13,
    color: "black",
  },
});
