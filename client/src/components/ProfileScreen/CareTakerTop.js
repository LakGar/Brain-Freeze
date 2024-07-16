import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store/authSlice";
import CaretakerButtons from "./CaretakerButtons";

const screenWidth = Dimensions.get("window").width;

const CareTakerTop = () => {
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
    }
  }, [dispatch, userToken, userInfo]);

  if (!userInfo) {
    return null;
  }

  const profileImageUrl =
    userInfo.profilePicture === "default-profile-pic.jpg"
      ? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
      : userInfo.profilePicture;

  return (
    <View style={{ justifyContent: "space-evenly" }}>
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <Image
            source={{ uri: profileImageUrl }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.nameContainer}>
          {userInfo.firstName === "blank" &&
          userInfo.lastName === "blank" ? null : (
            <Text style={styles.name}>
              {userInfo.firstName} {userInfo.lastName}
            </Text>
          )}
          <Text style={styles.subText}>Caretaker</Text>
        </View>
      </View>
      <CaretakerButtons userInfo={userInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    height: 140,
    width: screenWidth - 40,
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "lightgrey",
    flexDirection: "row",
    gap: 5,
    justifyContent: "left",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 10,
  },

  ImageContainer: {
    position: "relative",
    marginRight: 20,
    justifyContent: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "white",
  },
  nameContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    height: 120,
    gap: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "left",
    color: "#007AFF",
  },
  subText: {
    fontSize: 16,
    color: "gray",

    margin: 5,

    textAlign: "left", // Center the text
  },
});

export default CareTakerTop;
