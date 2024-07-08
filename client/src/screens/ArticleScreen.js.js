import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const API_KEY = "fad0e134553e4c8689e56e99dd238a5f";
const BASE_URL = "https://newsapi.org/v2/everything";

const ArticleScreen = ({ route }) => {
  const { field } = route.params;
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  console.log(field);

  useEffect(() => {
    fetchArticles(field).then(setArticles); // Fetch default articles on initial load based on field prop
  }, [field]);

  const fetchArticles = async (query) => {
    const url = `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
    try {
      const response = await axios.get(url);
      return response.data.articles;
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      return [];
    }
  };

  const handlePressArticle = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const searchArticles = (newQuery) => {
    fetchArticles(newQuery).then(setArticles);
    setQuery(newQuery);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>{field}</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for other articles"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => searchArticles(query)}
      />
      <FlatList
        data={articles}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePressArticle(item.url)}
          >
            <Image source={{ uri: item.urlToImage }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },
  backButton: {
    marginBottom: 10,
    position: "absolute",
    left: 0,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0062f7",
    textAlign: "center",
  },
  searchBar: {
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  card: {
    margin: 10,
    overflow: "hidden",
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#f0f4ff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Elevation for Android
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ArticleScreen;
