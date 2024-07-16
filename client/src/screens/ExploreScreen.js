import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
  ScrollView,
} from "react-native";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ExploreScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  const ArticleFields = [
    { name: "Dementia", icon: "computer", color: "#E53935" }, // Dark red
    { name: "Health", icon: "local-hospital", color: "#C2185B" }, // Dark pink
    { name: "Business", icon: "business-center", color: "#7B1FA2" }, // Dark purple
    { name: "Education", icon: "school", color: "#303F9F" }, // Dark blue
    { name: "Sports", icon: "sports-soccer", color: "#0288D1" }, // Dark light blue
    { name: "Entertainment", icon: "live-tv", color: "#00796B" }, // Dark teal
    { name: "Science", icon: "science", color: "#388E3C" }, // Dark green
    { name: "Politics", icon: "account-balance", color: "#F57C00" }, // Dark orange
  ];

  const renderField = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: "#fff" }]}
      onPress={() => navigation.navigate("ArticleScreen", { field: item.name })}
    >
      <MaterialIcons name={item.icon} size={40} color={item.color} />

      <Text style={styles.label}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() =>
        navigation.navigate("QuizScreen", {
          categoryId: item.id,
          categoryName: item.name,
        })
      }
    >
      <Text style={styles.label}>{item.name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Explore</Text>

      <View style={styles.subContainer}>
        <Text style={styles.subHeading}>Articles</Text>

        <FlatList
          scrollEnabled={false}
          data={ArticleFields}
          renderItem={renderField}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.cardContainer}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.subHeading}>Quizes</Text>

        <FlatList
          scrollEnabled={false}
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
      <View style={styles.gap}></View>
    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 60,
    backgroundColor: "rgba(213,217,234,0.1)",

    padding: 20,
    marginBottom: 0,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  subContainer: {
    marginVertical: 10,
  },
  card: {
    flex: 1,
    width: "100%",
    margin: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "left",
    gap: 5,
  },
  label: {
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
  },
  categoryButton: {
    flex: 1,
    width: "100%",
    margin: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "left",
    gap: 5,
  },
  gap: {
    height: 80,
  },
});
