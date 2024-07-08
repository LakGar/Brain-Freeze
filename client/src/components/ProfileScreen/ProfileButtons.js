import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileButtons = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.conatiner}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Share Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { maxWidth: 40 }]}>
        <Icon name="settings" size={24} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileButtons;

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
    gap: 10,
  },
  button: {
    backgroundColor: "#7a83ff",
    flex: 1,
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "white", // White color for the button text
    fontWeight: "700",
  },
});
