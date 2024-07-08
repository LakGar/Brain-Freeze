import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Button,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/authSlice";
import * as ImagePicker from "expo-image-picker";

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();

  const { userInfo, userToken } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(
    userInfo.profilePicture === "default-profile-pic.jpg"
      ? "https://source.unsplash.com/random/100x100?person"
      : userInfo.profilePicture
  );

  const [firstName, setFirstName] = useState(
    userInfo.firstName === "blank" ? null : userInfo.firstName
  );
  const [lastName, setLastName] = useState(
    userInfo.lastName === "blank" ? null : userInfo.lastName
  );

  const [username, setUsername] = useState(userInfo.username || "");

  const [pronouns, setPronouns] = useState("Pronouns");
  const [bio, setBio] = useState(userInfo.bio || "");
  const [links, setLinks] = useState("");
  const [banners, setBanners] = useState(0);
  const [gender, setGender] = useState("Male");

  useEffect(() => {
    getPermissionAsync();
  }, []);

  async function getPermissionAsync() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  const handleChoosePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("Result:", result); // Log the full result to debug

      if (result.cancelled) {
        console.log("User cancelled image picker");
      } else if (result.assets && result.assets.length > 0) {
        // Access the first item in the assets array
        const uri = result.assets[0].uri;
        setProfileImage(uri);
        console.log("Selected Image URI:", uri);
      } else {
        console.log("No assets found or array is empty");
      }
    } catch (error) {
      console.error("ImagePicker Error: ", error);
    }
  };

  const handleUpdate = () => {
    dispatch(
      updateUser({
        token: userToken,
        username,
        firstName,
        lastName,
        bio,
        profilePicture: profileImage,
      })
    );
    navigation.navigate("Profile");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit profile</Text>
        </View>

        <View style={styles.profileSection}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Text style={styles.editPictureText}>Edit picture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Frist name</Text>
            <TextInput
              style={styles.input}
              value={firstName || ""} // Display an empty string if firstName is null
              onChangeText={(text) =>
                setFirstName(text === "blank" ? null : text)
              }
              placeholder="First name"
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Last name</Text>

            <TextInput
              style={styles.input}
              value={lastName || ""} // Display an empty string if lastName is null
              onChangeText={(text) =>
                setLastName(text === "blank" ? null : text)
              }
              placeholder="Last name"
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Pronouns</Text>
            <TextInput
              style={styles.input}
              value={pronouns}
              onChangeText={setPronouns}
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.input}
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Links</Text>
            <TextInput
              style={styles.input}
              value={links}
              onChangeText={setLinks}
              placeholder="Add links"
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Banners</Text>
            <Text style={styles.input}>{banners}</Text>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.input}>{gender}</Text>
          </View>
        </View>

        <TouchableOpacity>
          <Text style={styles.linkText}>Switch to professional account</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Personal information settings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Show your profile is verified</Text>
        </TouchableOpacity>
      </ScrollView>
      <Button title="Save" onPress={handleUpdate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
  },
  avatarContainer: {
    marginTop: 8,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  editPictureText: {
    color: "#3499fd",
  },
  form: {
    paddingHorizontal: 16,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
    color: "black",
  },
  input: {
    fontSize: 16,
    color: "black",
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  linkText: {
    color: "#3499fd",
    padding: 16,
  },
});

export default EditProfile;
