// src/screens/ProfileScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import ProfileTop from "../components/ProfileScreen/ProfileTop";
import ProfileButtons from "../components/ProfileScreen/ProfileButtons";
import DiscoverPeople from "../components/DiscoverPeople";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../store/authSlice";
import ProfilePost from "../components/ProfileScreen/ProfilePost";
import { MaterialIcons } from "@expo/vector-icons";
import CareTakerCard from "../components/ProfileScreen/CareTakerCard";
import InfoCard from "../components/ProfileScreen/InfoCard";
import EmergencyContact from "../components/ProfileScreen/EmergencyContact";
import CaretakerButtons from "../components/ProfileScreen/CaretakerButtons";
import CareTakerTop from "../components/ProfileScreen/CareTakerTop";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
      console.log(userInfo);
    }
  }, [dispatch, userToken, userInfo]);

  if (!userInfo) {
    return null;
  }
  const userType = userInfo.userType;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userType === "Caretaker" || userType === "Doctor" ? (
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            gap: 0,
          }}
        >
          <CareTakerTop userInfo={userInfo} />
        </View>
      ) : (
        <ScrollView>
          <MaterialIcons
            name="note-add"
            size={24}
            color="black"
            style={styles.icon}
          />
          <ProfileTop />
          <ProfileButtons />
          <ProfilePost userInfo={userInfo} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    gap: 0,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    textAlign: "center",
    color: "#7a83ff",
  },
  icon: {
    position: "absolute",
    right: 20,
    top: 0,
  },
});

export default ProfileScreen;
