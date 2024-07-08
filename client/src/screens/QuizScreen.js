import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import he from "he"; // Import the library

const QuizScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
      );
      const decodedQuestions = response.data.results.map((q) => ({
        ...q,
        question: he.decode(q.question), // Decode the question text
        correct_answer: he.decode(q.correct_answer), // Decode the correct answer
        incorrect_answers: q.incorrect_answers.map((a) => he.decode(a)), // Decode all incorrect answers
      }));
      setQuestions(decodedQuestions);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching questions:", error);
      setError("Failed to load questions. Please try again later.");
      setLoading(false);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (!questions.length) return; // Guard clause

    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      navigation.navigate("ResultsScreen", { score, total: questions.length });
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.category}>{categoryName}</Text>
      {questions.length > 0 && (
        <View style={styles.quizContainer}>
          <Text style={styles.question}>
            {questions[currentQuestionIndex]?.question}
          </Text>
          <View style={styles.answerGroup}>
            {questions[currentQuestionIndex]?.incorrect_answers
              .concat(questions[currentQuestionIndex]?.correct_answer)
              .map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.answerButton}
                  onPress={() => handleAnswer(answer)}
                >
                  <Text style={styles.answerText}>{answer}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#d9d9d9",
    justifyContent: "space-between",
  },
  category: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0062f7",
    textAlign: "center",
    marginBottom: 50,
  },
  quizContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "black",
  },
  answerGroup: {
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
  answerButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    width: "100%",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  answerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
