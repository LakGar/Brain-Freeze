import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../store/authSlice";

const API_URL = "http://localhost:8000/api/users/register-patient"; // Update with your backend URL

const RegisterPatientScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userToken, userId } = useSelector((state) => state.auth);
  const careTakerId = userId;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [DOB, setDOB] = useState("");
  const [height, setHeight] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        {
          username,
          email,
          password,
          firstName,
          lastName,
          age,
          weight,
          DOB,
          height,
          userId: careTakerId,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      // Refresh user information after successful registration
      dispatch(getUserInfo(userToken));
      // Handle successful registration (e.g., navigate to patient list or home screen)
      navigation.navigate("Home"); // Adjust the navigation target as needed
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.IconContainer}
      >
        <Icon name={"chevron-back"} size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.title}>Register New Patient</Text>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="grey"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="grey"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="grey"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="grey"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Weight"
            placeholderTextColor="grey"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (YYYY-MM-DD)"
            placeholderTextColor="grey"
            value={DOB}
            onChangeText={setDOB}
          />
        </View>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Height"
            placeholderTextColor="grey"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                username && email && password ? "#9999ff" : "gray",
            },
          ]}
          onPress={handleRegister}
          disabled={!username || !email || !password || loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", height: 80 }}></View>
    </ScrollView>
  );
};
export default RegisterPatientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 60,
    padding: 20,
  },
  IconContainer: {
    width: "100%",
  },
  form: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  textBoxContainer: {
    width: "100%",
    position: "relative",
  },
  input: {
    height: 45,
    width: "100%",
    borderColor: "#d1d1d1",
    backgroundColor: "#fcfcfc",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 5,
    marginVertical: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  errorText: {
    width: "100%",
    color: "red",
    fontSize: 12,
    marginBottom: 4,
  },
});
