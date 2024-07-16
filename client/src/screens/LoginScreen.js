// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { setAuthState, getUserInfo } from "../store/authSlice";
import InstagramText from "../../assets/instagram-logo-text.png";
import Icon from "react-native-vector-icons/Ionicons";

const API_URL = "http://localhost:8000/api"; // Update with your backend URL

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email === "" && password === "") {
      setError("Please enter email and password");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      const { token } = response.data;
      await AsyncStorage.setItem("token", token);
      dispatch(setAuthState({ isAuthenticated: true, userToken: token }));
      dispatch(getUserInfo(token));
      dispatch(getUserInfo);
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Cognicare</Text>
      <TextInput
        style={styles.input}
        placeholder="Email, phone number, username"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={"grey"}
        autoCapitalize="none" // Disable auto-capitalization
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={"grey"}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="grey"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.divider}>
        <View style={styles.line}></View>
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.faceBookLogin}>
        <Icon name={"logo-facebook"} size={20} color="#007AFF" />
        <Text style={styles.facebookLoginText}>Login with facebook</Text>
      </View>
      <View style={styles.toggleAuth}>
        <Text style={styles.swtichAuthText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register1")}
          style={styles.swtichAuthButton}
        >
          <Text style={styles.swtichAuthButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    paddingTop: 238,
  },

  logo: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#007AFF",
    padding: 20,
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
  passwordContainer: {
    width: "100%",
    height: 45,
    position: "relative",
  },
  eyeIcon: {
    height: 40,
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    padding: 10,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginVertical: 20,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 13,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 5,
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  divider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  line: {
    width: "40%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#d1d1d1",
  },
  dividerText: {
    color: "grey",
    fontSize: 14,
    fontWeight: "600",
  },
  faceBookLogin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    gap: 6,
  },
  facebookLoginText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "700",
  },
  toggleAuth: {
    gap: 2,
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    width: "120%",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#d1d1d1",
    paddingTop: 30,
  },
  swtichAuthText: {
    color: "grey",
    fontSize: 12,
    fontWeight: "400",
  },
  swtichAuthButton: {
    // borderRadius: 5,
    // alignItems: "center",
    // justifyContent: "center",
  },
  swtichAuthButtonText: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "700",
  },
  error: {
    width: "100%",
    color: "red",
    fontSize: 12,
    fontWeight: "700",
  },
});

export default LoginScreen;
