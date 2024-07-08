import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const API_URL = "http://localhost:8000/api/users"; // Update with your backend URL

const RegisterScreen1 = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUsername = async () => {
      if (username) {
        setLoading(true);
        try {
          const response = await axios.post(`${API_URL}/check`, {
            identifier: username,
            type: "username",
          });
          setIsUsernameAvailable(response.status === 200);
        } catch (error) {
          setIsUsernameAvailable(false);
        } finally {
          setLoading(false);
        }
      } else {
        setIsUsernameAvailable(null);
      }
    };

    const timeoutId = setTimeout(checkUsername, 500); // Debounce API call
    return () => clearTimeout(timeoutId); // Cleanup the timeout
  }, [username]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.IconContainer}
      >
        <Icon name={"chevron-back"} size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.title}>Create username</Text>
        <Text style={styles.subTitle}>
          Pick a username for your new account. You can always change it later.
        </Text>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="grey"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          {loading ? (
            <ActivityIndicator style={styles.icon} size="small" color="gray" />
          ) : isUsernameAvailable === null ? null : isUsernameAvailable ? (
            <Icon
              name={"checkmark-circle-outline"}
              size={20}
              color="limegreen"
              style={styles.icon}
            />
          ) : (
            <Icon
              name={"close-circle-outline"}
              size={20}
              color="red"
              style={styles.icon}
            />
          )}
        </View>
        {!isUsernameAvailable && (
          <>
            <Text style={styles.error}>Username Unavailable</Text>
          </>
        )}

        <View style={styles.userTypecontainer}>
          {["Patient", "Doctor", "Family", "Caretaker"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.userTypeButton,
                userType === type && styles.activeUserTypeButton,
              ]}
              onPress={() => setUserType(type)}
            >
              <Text
                style={[
                  styles.userTypeButtonText,
                  userType === type && styles.activeUserTypeButtonText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                isUsernameAvailable === false ||
                username === "" ||
                userType === ""
                  ? "gray"
                  : "#9999ff",
            },
          ]}
          onPress={() =>
            navigation.navigate("Register2", { username, userType })
          }
          disabled={!isUsernameAvailable || username === "" || userType === ""} // Disable button if username or userType is not available
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen1;

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
  userTypecontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 16,
  },
  userTypeButton: {
    flex: 1,
    height: 45,
    backgroundColor: "#ccd9ff",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeUserTypeButton: {
    backgroundColor: "#9999ff",
  },
  userTypeButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6b7db3",
    textAlign: "center",
  },
  activeUserTypeButtonText: {
    color: "white",
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "gray",
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
  error: {
    width: "100%",
    color: "red",
    fontSize: 12,
    fontWeight: "700",
  },
});
