import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const TaskCard = ({
  title,
  time,
  description,
  status,
  priority,
  onComplete,
}) => {
  const [isCompleted, setIsCompleted] = useState(status === "Completed");

  const handleComplete = () => {
    setIsCompleted(true);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={[styles.title, isCompleted && styles.completedText]}>
          {title}
        </Text>
        <Text style={[styles.time, isCompleted && styles.completedText]}>
          {time}
        </Text>
      </View>
      <Text style={[styles.description, isCompleted && styles.completedText]}>
        {description}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={[styles.status, isCompleted && styles.completedText]}>
          {isCompleted ? "Completed" : status}
        </Text>
        <Text style={[styles.priority, isCompleted && styles.completedText]}>
          {priority}
        </Text>
      </View>
      {!isCompleted && (
        <TouchableOpacity
          onPress={handleComplete}
          style={styles.completeButton}
        >
          <Text style={styles.completeButtonText}>Complete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#888",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  status: {
    fontSize: 12,
    color: "#888",
  },
  priority: {
    fontSize: 12,
    color: "#f00",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  completeButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  completeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
