import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

const API_URL = "http://localhost:8000/api/users/register"; // Update with your backend URL

const RegisterScreen3 = ({ navigation, route }) => {
  const { username, password, userType } = route.params; // Retrieve the username and password from route params
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [useEmail, setUseEmail] = useState(true); // true for email, false for phone

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        username,
        password,
        email: useEmail ? email : "",
        phone: useEmail ? "" : phone,
        firstName: "blank",
        lastName: "blank",
        userType,
      });
      // Handle successful registration (e.g., navigate to login or home screen)
      navigation.navigate("Login");
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const validateInput = () => {
    if (useEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    } else {
      const phonePattern = /^\d{10,15}$/;
      return phonePattern.test(phone);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.IconContainer}
      >
        <Icon name={"chevron-back"} size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.title}>Add Phone or Email</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => setUseEmail(false)}
          >
            <Text style={!useEmail ? styles.activeText : styles.unactiveText}>
              Phone
            </Text>
            <View style={!useEmail ? styles.active : styles.unactive}></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => setUseEmail(true)}
          >
            <Text style={useEmail ? styles.activeText : styles.unactiveText}>
              Email
            </Text>
            <View style={useEmail ? styles.active : styles.unactive}></View>
          </TouchableOpacity>
        </View>
        {useEmail ? (
          <View style={styles.textBoxContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="grey"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {validateInput() ? (
              <Icon
                name={"checkmark-circle-outline"}
                size={20}
                color="limegreen"
                style={styles.icon}
              />
            ) : email ? (
              <Icon
                name={"close-circle-outline"}
                size={20}
                color="red"
                style={styles.icon}
              />
            ) : null}
          </View>
        ) : (
          <View style={styles.textBoxContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              placeholderTextColor="grey"
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
            />
            {validateInput() ? (
              <Icon
                name={"checkmark-circle-outline"}
                size={20}
                color="limegreen"
                style={styles.icon}
              />
            ) : phone ? (
              <Icon
                name={"close-circle-outline"}
                size={20}
                color="red"
                style={styles.icon}
              />
            ) : null}
          </View>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: validateInput() ? "#9999ff" : "gray",
            },
          ]}
          onPress={handleRegister}
          disabled={!validateInput() || loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign up</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    paddingTop: 60,
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
  toggleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionContainer: {
    width: "50%",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
    paddingBottom: 16,
  },
  activeText: {
    color: "black",
    fontSize: 21,
    fontWeight: "600",
  },
  unactiveText: {
    color: "grey",
    fontSize: 21,
    fontWeight: "600",
  },
  active: {
    width: "100%",
    height: StyleSheet.hairlineWidth * 3,
    backgroundColor: "black",
  },
  unactive: {
    width: "100%",
    height: StyleSheet.hairlineWidth * 3,
    backgroundColor: "#d1d1d1",
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
  icon: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    alignItems: "center",
    paddingVertical: 12,
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
