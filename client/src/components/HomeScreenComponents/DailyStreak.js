import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

const DailyStreak = ({ streakDays }) => {
  const progress = useRef(new Animated.Value(0)).current;

  // Define streak levels
  const streakLevels = {
    7: "1 week",
    30: "1 month",
    90: "3 months",
    180: "6 months",
  };

  // Function to find the next streak level
  const getNextLevel = (days) => {
    const levels = Object.keys(streakLevels)
      .map(Number)
      .sort((a, b) => a - b);
    return levels.find((level) => level > days);
  };

  // Function to find the previous streak level
  const getPreviousLevel = (days) => {
    const levels = Object.keys(streakLevels)
      .map(Number)
      .sort((a, b) => a - b);
    for (let i = levels.length - 1; i >= 0; i--) {
      if (days >= levels[i]) return levels[i];
    }
    return 0;
  };

  const previousLevelDays = getPreviousLevel(streakDays);
  const currentLevel = getNextLevel(streakDays);

  // Calculate progress
  useEffect(() => {
    const nextLevelDays = getNextLevel(streakDays);
    const progressRange = nextLevelDays - previousLevelDays;
    const progressValue = streakDays - previousLevelDays;
    const animatedTo = (progressValue / progressRange) * 100;

    Animated.timing(progress, {
      toValue: animatedTo,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [streakDays, progress]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.message}>
          You've been tracking your progress for {streakDays} days and have
          reached your
          <Text style={{ color: "#ff9413" }}>
            {" "}
            {streakLevels[previousLevelDays] || "starting point"}{" "}
          </Text>
          goal.
        </Text>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.levelText}>
          Next goal: {streakLevels[currentLevel]} in {currentLevel - streakDays}{" "}
          days
        </Text>
      </View>
    </View>
  );
};

export default DailyStreak;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  body: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    // Shadow properties for iOS
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
  message: {
    textAlign: "left",
    width: "100%",
    marginVertical: 8,
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },

  progressBarContainer: {
    height: 10,
    width: "100%",
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#ff9413",
    borderRadius: 20,
  },
  levelText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
});
