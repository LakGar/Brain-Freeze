import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store/authSlice";

const ProfileTop = () => {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ImageContainer}>
          <Image
            source={{ uri: profileImageUrl }}
            style={styles.profileImage}
          />
        </View>
      </View>
      {userInfo.firstName === "blank" &&
      userInfo.lastName === "blank" ? null : (
        <Text style={styles.name}>
          {userInfo.firstName} {userInfo.lastName}
        </Text>
      )}
      <Text style={styles.bio}>{userInfo.bio}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{userInfo.tasks?.length || 0}</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{userInfo.posts?.length || 0}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  coverImgContainer: {
    position: "absolute",
    width: "120%",
    height: 200,
    overflow: "hidden",
    top: 0,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  ImageContainer: {
    position: "relative",
    marginRight: 20,
    justifyContent: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "white",
  },

  addButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 31,
    color: "white",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    gap: 5,
  },
  stat: {
    alignItems: "center",
    width: 70,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    margin: 5,
    textAlign: "center",
  },
  bio: {
    fontSize: 16,
    margin: 5,

    textAlign: "center", // Center the text
  },
});

export default ProfileTop;
