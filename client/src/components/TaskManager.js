import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const TaskManager = ({ date }) => {
  const navigation = useNavigation();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.userToken);
  const currentDate = new Date(date);
  currentDate.setHours(7, 0, 0, 0);

  useEffect(() => {
    dispatch(fetchTasks({ token: userToken, date: currentDate }));
  }, [dispatch, userToken, date]);

  const getTaskStyle = (type) => {
    switch (type) {
      case "appointment":
        return {
          borderColor: "#f66a5a",
          color: "#f66a5a",

          icon: "calendar",
          backgroundColor: "#fbd1cb",
        };
      case "prescription":
        return {
          borderColor: "#f66a5a",
          color: "#f66a5a",

          icon: "medkit",
          backgroundColor: "#fde9d0",
        };
      default:
        return {
          borderColor: "#79b7a0",
          color: "#79b7a0",

          icon: "checkmark-circle-outline",
          backgroundColor: "#d4ebe3",
        };
    }
  };
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const formatDateLong = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const noTasksMessage = () => {
    if (tasks.length === 0) {
      const currentDate = new Date();
      if (isToday(currentDate)) {
        return "No tasks today.";
      } else {
        return `No tasks on ${formatDateLong(currentDate)}.`;
      }
    }
    return null;
  };

  const renderItem = ({ item }) => {
    const taskStyle = getTaskStyle(item.type);
    return (
      <TouchableOpacity
        style={[
          styles.taskItem,
          {
            borderLeftColor: taskStyle.borderColor,
            borderLeftWidth: 7,
            backgroundColor: taskStyle.backgroundColor,
          },
        ]}
        onPress={() =>
          navigation.navigate("UpdateTask", {
            taskId: item._id,
          })
        }
      >
        <View style={styles.taskStatusContainer}>
          <Text style={styles.taskStatus}>{item.status}</Text>
        </View>

        <View style={styles.mainDetail}>
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.taskTitle,
                {
                  color: taskStyle.color,
                },
              ]}
            >
              {item.title}
            </Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
          </View>
          <Text style={[styles.taskType, { color: taskStyle.borderColor }]}>
            {item.type}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Icon
            name={"time-outline"}
            size={20}
            color="#333"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.dueAtText}>{formatDate(item.dueAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <Text style={styles.noTaskText}>Loading...</Text>}
      {!loading && tasks.length === 0 && (
        <View style={styles.noTaskContainer}>
          <Text style={styles.noTaskText}>{`No Tasks on ${
            months[date.getMonth()]
          }, ${days[date.getDay()]} ${date.getDate()}`}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        key={date.toISOString()} // Change key to force re-render
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "90%",
  },
  noTaskContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noTaskText: {
    textAlign: "center",
    color: "grey",
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4D66F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "column",
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "white",
    borderLeftWidth: 4,
  },
  mainDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  titleContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  taskType: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
  },
  taskDescription: {
    fontSize: 16,
    color: "#888",
    fontWeight: "600",
  },
  timeContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "grey",
    paddingTop: 10,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  dueAtText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "700",
  },
  taskStatusContainer: {
    position: "absolute",
    width: "100%",
    height: "100%", // Specify a height
    justifyContent: "flex-end",
    alignItems: "center", // Ensures content inside taskStatus is centered
    textAlign: "center",
    zIndex: -1,
  },
  taskStatus: {
    fontSize: 42,
    fontWeight: "700",
    color: "red",
    opacity: 0.2,
    textTransform: "uppercase",
    marginBottom: "3%",
  },
});

export default TaskManager;
