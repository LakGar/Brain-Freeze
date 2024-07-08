import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const CaretakerButtons = ({ userInfo }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <View style={styles.iconContainer}>
          <Icon name="pencil-outline" size={24} color={"white"} />
        </View>
        <Text style={styles.buttonText}>Edit Profile</Text>
        <Icon name="chevron-forward-outline" size={24} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Icon name="person-outline" size={24} color={"white"} />
        </View>
        <Text style={styles.buttonText}>View Patients</Text>
        <Icon name="chevron-forward-outline" size={24} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Icon name="lock-closed-outline" size={24} color={"white"} />
        </View>
        <Text style={styles.buttonText}>Change Password</Text>
        <Icon name="chevron-forward-outline" size={24} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RegisterPatient")}
      >
        <View style={styles.iconContainer}>
          <Icon name="person-add-outline" size={24} color={"white"} />
        </View>
        <Text style={styles.buttonText}>Add Patient</Text>
        <Icon name="chevron-forward-outline" size={24} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Icon name="settings-outline" size={24} color={"white"} />
        </View>
        <Text style={styles.buttonText}>Settings</Text>
        <Icon name="chevron-forward-outline" size={24} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={[styles.iconContainer, styles.logoutIconContainer]}>
          <Icon name="exit-outline" size={24} color={"white"} />
        </View>
        <Text style={styles.buttonText}>Log Out</Text>
        <Icon name="chevron-forward-outline" size={24} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

export default CaretakerButtons;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    padding: 14,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  iconContainer: {
    padding: 15,
    backgroundColor: "#9999ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  logoutIconContainer: {
    backgroundColor: "#ff6666", // Different color for logout icon
  },
  buttonText: {
    flex: 1,
    marginLeft: 10,
    color: "black",
    fontSize: 16,
  },
});
