import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

// Sample data for the FlatList
const people = [
  {
    id: "1",
    username: "john_doe",
    image: "https://source.unsplash.com/random/100x100?person",
  },
  {
    id: "2",
    username: "jane_smith",
    image: "https://source.unsplash.com/random/100x100?person",
  },
  {
    id: "3",
    username: "susan_lee",
    image: "https://source.unsplash.com/random/100x100?person",
  },
  {
    id: "4",
    username: "michael_brown",
    image: "https://source.unsplash.com/random/100x100?person",
  },
  {
    id: "5",
    username: "emily_davis",
    image: "https://source.unsplash.com/random/100x100?person",
  },
];

const DiscoverPeople = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.remove}>
        <Text style={styles.removeButton}>+</Text>
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.followedBy}>Followed by</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Discover People</Text>
        <Text style={styles.subHeadingText}>See all</Text>
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
  );
};

export default DiscoverPeople;

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  headingText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subHeadingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3499fd",
  },
  cardList: {
    paddingLeft: 10,
  },
  card: {
    position: "relative",
    width: 170,
    height: 220,
    padding: 16,
    marginRight: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "grey",
    shadowColor: "#000",
  },
  remove: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }],
  },
  removeButton: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 31,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
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
  button: {
    backgroundColor: "#3499fd",
    paddingVertical: 6,
    width: "90%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
