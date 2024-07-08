import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const RegisterScreen2 = ({ navigation, route }) => {
  const { username, userType } = route.params;
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const validatePassword = (text) => {
    const newErrors = [];

    if (text.length < 6) {
      newErrors.push("Password must be at least 6 characters long.");
    }

    if (!/\d/.test(text)) {
      newErrors.push("Password must contain at least one number.");
    }

    setErrors(newErrors);
    setPassword(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register1")}
        style={styles.IconContainer}
      >
        <Icon name={"chevron-back"} size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.title}>Create password</Text>
        <Text style={styles.subTitle}>
          We can remember the password, so you won't need to enter it on your
          iCloud devices
        </Text>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            value={password}
            onChangeText={validatePassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <Icon
            name={
              errors.length === 0
                ? "checkmark-circle-outline"
                : "close-circle-outline"
            }
            size={20}
            color={errors.length === 0 ? "limegreen" : "red"}
            style={styles.icon}
          />
        </View>
        {errors.map((error, index) => (
          <Text key={index} style={styles.errorText}>
            {error}
          </Text>
        ))}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: errors.length === 0 ? "#9999ff" : "gray",
            },
          ]}
          onPress={() =>
            navigation.navigate("Register3", { username, password, userType })
          }
          disabled={!errors.length === 0}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen2;

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
  subTitle: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
    color: "gray",
    width: "77%",
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
