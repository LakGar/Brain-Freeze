import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HomeHeader = ({ userInfo }) => {
  // Check if userInfo exists and if not, use a default image URL
  const profileImageUrl = userInfo
    ? userInfo.profilePicture === "default-profile-pic.jpg"
      ? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
      : userInfo.profilePicture
    : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
      </View>
      <Text style={styles.logo}>BrainFreeze</Text>
      <View style={styles.iconContainer}>
        <Icon name="notifications" size={30} color="#747474" />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#c2c2ff",
  },
  iconContainer: {},
});
