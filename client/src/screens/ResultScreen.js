import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ResultsScreen = ({ route, navigation }) => {
  const { score, total } = route.params;
  const scorePercentage = (score / total) * 100;

  let title, description;

  if (scorePercentage >= 80) {
    title = "Outstanding!";
    description = "You're a quiz master! Keep up the great work.";
  } else if (scorePercentage >= 50) {
    title = "Good Job!";
    description =
      "Nice effort! You can do even better with a bit more practice.";
  } else {
    title = "Keep Trying!";
    description = "Don't worry, practice makes perfect. Try again to improve.";
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon name="trophy" size={100} color="#0226f7" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.resultText}>Your Score:</Text>
        <Text style={styles.score}>
          <Text style={styles.scoreMain}>{score}</Text> / {total}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.buttonText}>Retake Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ExploreScreen")}
        >
          <Text style={styles.buttonText}>Choose Another Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 160,
    padding: 20,
    backgroundColor: "#d9d9d9",
    justifyContent: "space-between",
  },

  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0226f7", // Dark blue color for the title
    marginVertical: 30,
  },
  resultText: {
    fontSize: 16,
    color: "grey", // Dark blue color for the text
    fontWeight: "bold",
    marginBottom: 5,
  },
  scoreMain: {
    fontSize: 76,
    fontWeight: "bold",
    color: "#0226f7", // Dark blue color for the score
  },
  score: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0226f7", // Dark blue color for the score
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  button: {
    margin: 5,
    width: "45%",
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
  buttonText: {
    fontSize: 18,
    color: "#000", // White color for the button text
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
});
