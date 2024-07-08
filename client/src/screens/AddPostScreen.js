import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";

const CategorySelectionScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

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
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    gap: 0,
    paddingTop: 60,
    backgroundColor: "#d9d9d9",
  },
  categoryButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#4D66F3",
    borderRadius: 5,
  },
  categoryText: {
    color: "white",
    fontSize: 18,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default CategorySelectionScreen;
