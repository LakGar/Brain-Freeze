import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import TaskManager from "../components/TaskManager";
import Icon from "react-native-vector-icons/Ionicons";

const TaskScreen = ({ navigation }) => {
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const daysOfMonthRef = useRef(null);
  const lastSelectedMonth = useRef(currentDate.getMonth()); // Track the last selected month

  useEffect(() => {
    const today = new Date();
    const currentMonthIndex = daysOfMonth.findIndex(
      (day) =>
        day.getDate() === today.getDate() && day.getMonth() === today.getMonth()
    );
    if (daysOfMonthRef.current && currentMonthIndex >= 0) {
      daysOfMonthRef.current.scrollToIndex({
        index: currentMonthIndex,
        animated: true,
      });
    }
  }, [selectedDate]); // Depend on selectedDate to update when it changes
  const daysOfMonth = generateMonthDays(
    selectedDate.getFullYear(),
    selectedDate.getMonth()
  );

  function generateMonthDays(year, month) {
    let days = [];
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  }

  const handleMonthChange = (month) => {
    const monthIndex = months.indexOf(month);
    // Check if the selected month is the current month
    if (monthIndex === currentDate.getMonth()) {
      setSelectedDate(
        new Date(currentDate.getFullYear(), monthIndex, currentDate.getDate())
      );
    } else if (monthIndex === selectedDate.getMonth()) {
      setSelectedDate(new Date(currentDate.getFullYear(), monthIndex));
    } else {
      setSelectedDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(new Date(date.setHours(0, 0, 0, 0)));
  };
  const [isActive, setIsActive] = useState(false);
  const animations = useRef(
    Array(6)
      .fill(null)
      .map(() => new Animated.Value(0))
  ).current;

  const toggleMenu = () => {
    setIsActive(!isActive);
    animations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: isActive ? 0 : 1,
        duration: 300 + index * 100,
        useNativeDriver: true,
      }).start();
    });
  };

  // Array of navigation routes for example
  const navigationRoutes = [
    "AddExercise",
    "AddRelax",
    "AddBrainActivity",
    "AddTask",
    "AddWater",
    "AddSteps",
  ];
  const labels = [
    "Exercise",
    "Relax",
    "BrainActivity",
    "Task",
    "Water",
    "Steps",
  ];

  const buttonSize = 60;
  const distance = 70; // Distance from the center button
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule</Text>

      <View style={styles.header}>
        <Text style={styles.headerDate}>{`${months[selectedDate.getMonth()]}, ${
          days[selectedDate.getDay()]
        } ${selectedDate.getDate()}`}</Text>
        <RNPickerSelect
          onValueChange={handleMonthChange}
          items={months.map((month) => ({ label: month, value: month }))}
          style={pickerSelectStyles}
          value={months[selectedDate.getMonth()]}
        />
      </View>

      <View style={styles.weekView}>
        <FlatList
          ref={daysOfMonthRef}
          data={daysOfMonth}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.day,
                item.toDateString() === currentDate.toDateString()
                  ? styles.currentDay
                  : null, // Add this line
                item.toDateString() === selectedDate.toDateString()
                  ? styles.selectedDay
                  : null,
              ]}
              onPress={() => handleDateSelect(item)}
            >
              <Text
                style={[
                  styles.dayText,
                  item.toDateString() === selectedDate.toDateString()
                    ? { color: "white" }
                    : null,
                  item.toDateString() === currentDate.toDateString()
                    ? { color: "white" }
                    : null,
                ]}
              >
                {days[item.getDay()]}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  item.toDateString() === selectedDate.toDateString()
                    ? { color: "white" }
                    : null,
                  item.toDateString() === currentDate.toDateString()
                    ? { color: "white" }
                    : null,
                ]}
              >
                {item.getDate()}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.toDateString()}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: 56,
            offset: 56 * index,
            index,
          })}
        />
        <View style={styles.tasksContainer}>
          <TaskManager date={selectedDate} />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={toggleMenu}
          style={[
            styles.addButttonContainer,
            { width: buttonSize, height: buttonSize },
          ]}
        >
          <Icon name={isActive ? "close" : "add"} size={30} color="#FFF" />
        </TouchableOpacity>
        {animations.map((anim, index) => {
          const translateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -(index + 1) * distance], // Each button moves up further
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.button,
                styles.smallButton,
                {
                  opacity: anim,
                  transform: [{ translateY }],
                },
              ]}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate(navigationRoutes[index]);
                  toggleMenu();
                }}
              >
                <Text style={styles.label}>{labels[index]}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerDate: {
    fontSize: 18,
    color: "#555",
    fontWeight: "bold",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0062f7",
  },
  weekView: {
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  day: {
    alignItems: "center",
    marginLeft: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: 60,
    height: 55,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  dateText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#555",
  },
  selectedDay: {
    backgroundColor: "#4D66F3",
    color: "white",
  },
  selectedDayText: {
    color: "white",
    fontWeight: "bold",
  },
  currentDay: {
    backgroundColor: "#7C90FF",
    color: "white",
  },

  buttonsContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  addButttonContainer: {
    backgroundColor: "#4D66F3",
    borderRadius: "50%",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  button: {
    position: "absolute",
    right: 10,
    bottom: 40,
    backgroundColor: "#B9C3FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  smallButton: {
    width: 120,
    height: 40,
    borderRadius: 20,
    padding: 5,
    backgroundColor: "#999",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: "#4D66FB",
    color: "white",
    textAlign: "center",
    width: 100,
    fontWeight: "bold",
  },
  inputAndroid: {
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#e0baff",
  },
};

export default TaskScreen;
