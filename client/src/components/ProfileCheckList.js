import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Octicons";

const ProfileCheckList = ({ userInfo }) => {
  const [count, setCount] = useState(4);
  const [following, setFollowing] = useState(true);
  const [name, setName] = useState(true);
  const [bio, setBio] = useState(true);
  const [photo, setPhoto] = useState(true);

  useEffect(() => {
    let updatedCount = 4;

    if (userInfo.posts?.length || userInfo.posts < 5) {
      setFollowing(false);
      updatedCount -= 1;
      console.log("Friends");
    } else {
      setFollowing(true);
    }

    if (userInfo.firstName === "blank" || userInfo.lastName === "blank") {
      setName(false);
      updatedCount -= 1;
      console.log("name");
    } else {
      setName(true);
    }

    if (userInfo.profilePicture === "default-profile-pic.jpg") {
      setPhoto(false);
      updatedCount -= 1;
      console.log("pic");
    } else {
      setPhoto(true);
    }

    if (userInfo.bio == null) {
      setBio(false);
      updatedCount -= 1;
      console.log("bio");
    } else {
      setBio(true);
    }

    setCount(updatedCount);
  }, [userInfo]);

  const people = [
    {
      id: "1",
      heading: "Find people to follow",
      subHeading: "Follow 5 or more accounts.",
      icon: "people",
      text: "Find people",
      completed: following,
    },
    {
      id: "2",
      heading: "Add your name",
      subHeading: "Add your full name so your friends know it's you.",
      icon: "person",
      text: "Edit name",
      completed: name,
    },
    {
      id: "3",
      heading: "Add a profile photo",
      subHeading: "Choose a photo to represent yourself on Instagram.",
      icon: "device-camera-video",
      text: "Change photo",
      completed: photo,
    },
    {
      id: "4",
      heading: "Add a bio",
      subHeading: "Tell your friends a little bit about yourself.",
      icon: "comment",
      text: "Edit bio",
      completed: bio,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.icon}>
          <Icon name={item.icon} color={"black"} size={28} />
          {item.completed && (
            <View style={styles.check}>
              <Icon name={"check-circle-fill"} color={"limegreen"} size={24} />
            </View>
          )}
        </View>
        <Text style={styles.username}>{item.heading}</Text>
        <Text style={styles.followedBy}>{item.subHeading}</Text>
      </View>

      <TouchableOpacity
        style={!item.completed ? styles.buttonActive : styles.button}
      >
        <Text style={!item.completed ? styles.textActive : styles.text}>
          {item.text}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {count >= 0 && (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Complete your profile</Text>
            <Text style={styles.subHeadingText}>
              {count} of 4{" "}
              <Text style={{ color: "lightgrey", fontSize: 11 }}>complete</Text>
            </Text>
          </View>
          <FlatList
            data={people}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardList}
          />
        </View>
      )}
    </View>
  );
};
export default ProfileCheckList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  heading: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "left",
    marginBottom: 16,
    paddingHorizontal: 20,
    gap: 5,
  },
  headingText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subHeadingText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  cardList: {
    paddingLeft: 20,
    paddingBottom: 20,
  },

  card: {
    position: "relative",
    width: 220,
    height: 230,
    padding: 16,
    marginRight: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  icon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  check: {
    position: "absolute",
    bottom: 0,
    right: -10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  followedBy: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
  },
  buttonActive: {
    backgroundColor: "dodgerblue",
    paddingVertical: 6,
    width: "70%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "auto",
  },
  button: {
    backgroundColor: "lightgrey",
    paddingVertical: 6,
    width: "70%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "auto",
  },
  text: {
    color: "black",
    fontSize: 14,
    fontWeight: "600",
  },
  textActive: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
