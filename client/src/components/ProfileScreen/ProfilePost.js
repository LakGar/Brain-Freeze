import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileCheckList from "../ProfileCheckList";
import CareTakerCard from "./CareTakerCard";
import InfoCard from "./InfoCard";
import EmergencyContact from "./EmergencyContact";
import Metrics from "../HomeScreenComponents/Metrics";

const { width } = Dimensions.get("window");

const ProfilePost = ({ userInfo }) => {
  const [activeTab, setActiveTab] = useState("grid");
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    Animated.spring(translateX, {
      toValue: tab === "grid" ? 0 : width / 2,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress("grid")}
        >
          <Icon
            name="grid"
            size={30}
            color={activeTab === "grid" ? "black" : "gray"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress("person")}
        >
          <MaterialCommunityIcons
            name="card-account-details"
            size={34}
            color={activeTab === "person" ? "black" : "gray"}
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <View
          style={[
            styles.sliderIndicator,
            { backgroundColor: activeTab === "grid" ? "black" : "transparent" },
          ]}
        />
        <View
          style={[
            styles.sliderIndicator,
            {
              backgroundColor: activeTab === "person" ? "black" : "transparent",
            },
          ]}
        />
      </Animated.View>
      <View style={styles.content}>
        {activeTab === "grid" ? (
          <View style={styles.gridContent}>
            <ProfileCheckList userInfo={userInfo} />
          </View>
        ) : (
          <View>
            <CareTakerCard />
            <InfoCard />
            <Metrics userInfo={userInfo} />
            <EmergencyContact />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfilePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    flexDirection: "row",
    width: "50%",
    height: 2,
    backgroundColor: "black",
  },
  //   sliderIndicator: {
  //     width: "50%",
  //     height: "100%",
  //   },
  content: {
    flex: 1,
  },
  gridContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  personContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  tagContainer: {
    marginTop: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  mainText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
    marginBottom: 40,
  },
});
