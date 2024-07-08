import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";
import { logout, getUserInfo } from "../store/authSlice";
import HomeHeader from "../components/HomeScreenComponents/HomeHeader";
import DailyStreak from "../components/HomeScreenComponents/DailyStreak";
import Metrics from "../components/HomeScreenComponents/Metrics";
import UpNext from "../components/HomeScreenComponents/UpNext";
import DailySummary from "../components/HomeScreenComponents/DailySummary";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const fillAnimation = useRef(new Animated.Value(0)).current; // Animation reference
  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
    }
  }, [dispatch, userToken, userInfo]);

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleLongPress = () => {
    fillAnimation.stopAnimation(); // Stops the current animation if it's still running
    fillAnimation.setValue(1); // Instantly set fill to full
    setModalVisible(true); // Open the modal for emergency actions
  };

  const startFill = () => {
    Animated.timing(fillAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const resetFill = () => {
    fillAnimation.setValue(0);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <HomeHeader userInfo={userInfo} />
        <Text style={styles.header}>Welcome Back,</Text>
        <Text style={styles.subText}>Jennifer</Text>

        <DailyStreak streakDays={userInfo?.loginStreak?.count || 0} />
        <DailySummary />
        <UpNext userInfo={userInfo} />
        <Metrics userInfo={userInfo} />
        <Button title="Logout" onPress={handleLogout} />
      </ScrollView>
      <TouchableOpacity
        style={styles.emergencyButton}
        onPressIn={startFill}
        onPressOut={resetFill}
        onLongPress={handleLongPress}
      >
        <Animated.View
          style={[
            styles.fillBar,
            {
              width: fillAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
        <Icon name="alert-circle-outline" color={"white"} size={60} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.model}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Emergency Contact</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => console.log("Calling Police...")} // Implement actual call function
            >
              <Text style={styles.modalButtonText}>Call Bill Griffin</Text>
            </TouchableOpacity>
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
              color="white"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  body: {
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  subText: {
    fontSize: 20,
    top: -10,
    color: "#666",
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  emergencyButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: "50%",
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  fillBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "red",
    borderRadius: 5,
  },
  emergencyText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    zIndex: 1, // Make sure the text stays on top
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    backgroundColor: "#FF3F3F",
    borderRadius: 20,
    width: "95%",
    height: "93%",
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalButton: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 10,
    elevation: 2,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    color: "red",
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default HomeScreen;
