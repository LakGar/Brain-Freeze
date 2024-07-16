import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { fetchAllTasks } from "../../store/taskSlice";

const UpcomingAppt = ({ userInfo, navigation }) => {
  const [activeList, setActiveList] = useState("today");
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const { tasks, loading } = useSelector((state) => state.tasks);
  const userToken = useSelector((state) => state.auth.userToken);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      console.log("Fetching all tasks");
      dispatch(fetchAllTasks({ token: userToken }));
    }, [dispatch, userToken])
  );

  useEffect(() => {
    const today = moment().startOf("day");
    const tomorrow = moment().add(1, "days").startOf("day");
    const nextWeek = moment().add(7, "days").endOf("day");

    const filteredTodayTasks = tasks.filter(
      (task) =>
        moment(task.dueAt).isSame(today, "day") && task.type === "appointment"
    );
    const filteredUpcomingTasks = tasks.filter(
      (task) =>
        moment(task.dueAt).isBetween(tomorrow, nextWeek, null, "[]") &&
        task.type === "appointment"
    );
    const filteredOverdueTasks = tasks.filter(
      (task) =>
        moment(task.dueAt).isBefore(today, "day") &&
        task.status !== "completed" &&
        task.type === "appointment"
    );

    setTodayTasks(filteredTodayTasks);
    setUpcomingTasks(filteredUpcomingTasks);
    setOverdueTasks(filteredOverdueTasks);

    const userIds = [
      ...new Set([
        ...filteredTodayTasks.map((task) => task.createdBy),
        ...filteredTodayTasks.map((task) => task.createdFor._id),
        ...filteredUpcomingTasks.map((task) => task.createdBy),
        ...filteredUpcomingTasks.map((task) => task.createdFor._id),
        ...filteredOverdueTasks.map((task) => task.createdBy),
        ...filteredOverdueTasks.map((task) => task.createdFor._id),
      ]),
    ];

    const fetchUserDetails = async () => {
      const details = {};
      await Promise.all(
        userIds.map(async (userId) => {
          console.log(`fetching user ${userId}`);
          if (!userDetails[userId]) {
            try {
              const response = await axios.get(
                `http://localhost:8000/api/users/${userId}`
              );
              details[userId] = response.data;
            } catch (error) {
              console.error("Error fetching user details:", error);
            }
          } else {
            details[userId] = userDetails[userId];
          }
        })
      );
      setUserDetails((prevDetails) => ({ ...prevDetails, ...details }));
    };

    fetchUserDetails();
  }, [tasks]);

  const renderTask = ({ item }) => {
    const createdByDetails = userDetails[item.createdBy] || {};
    const createdForDetails = userDetails[item.createdFor._id] || {};
    const createdByPicture =
      createdByDetails.profilePicture ||
      "https://source.unsplash.com/50x50/?portrait";
    const createdForPicture =
      createdForDetails.profilePicture ||
      "https://source.unsplash.com/50x50/?portrait";

    const isOverdue =
      moment(item.dueAt).isBefore(moment(), "day") &&
      item.status !== "completed";
    const backgroundColor = isOverdue
      ? "rgba(255, 0, 0, 0.1)"
      : "rgba(0, 122, 255, 0.2)";

    return (
      <View style={[styles.taskContainer, { backgroundColor }]}>
        <Text style={styles.username}>{item.createdFor.username}</Text>
        <View style={styles.top}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.taskDate}>
            {moment(item.dueAt).isSame(moment(), "day")
              ? moment(item.dueAt).format("h:mma")
              : moment(item.dueAt).format("M/DD h:mma")}
          </Text>
          <View style={styles.userDetailsContainer}>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: createdForPicture }}
                style={[styles.profilePicture, styles.profileTop]}
              />
              <Image
                source={{ uri: createdByPicture }}
                style={[styles.profilePicture, styles.profileBottom]}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleButton}>
        <TouchableOpacity
          style={
            activeList === "today"
              ? styles.activeButtonl
              : styles.inactiveButton
          }
          onPress={() => setActiveList("today")}
        >
          <Text
            style={
              activeList === "today"
                ? styles.activeButtonText
                : styles.inactiveButtonText
            }
          >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeList === "upcoming"
              ? styles.activeButtonr
              : styles.inactiveButton
          }
          onPress={() => setActiveList("upcoming")}
        >
          <Text
            style={
              activeList === "upcoming"
                ? styles.activeButtonText
                : styles.inactiveButtonText
            }
          >
            Upcoming
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <Text>Loading...</Text>}
      {!loading && activeList === "today" && todayTasks.length === 0 && (
        <View style={styles.noTaskContainer}>
          <Text style={styles.noTaskText}>
            There are no appointments today.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CreateAppointment")}
          >
            <Text style={styles.buttonText}>Create Appointment</Text>
          </TouchableOpacity>
        </View>
      )}
      {!loading && activeList === "upcoming" && upcomingTasks.length === 0 && (
        <View style={styles.noTaskContainer}>
          <Text style={styles.noTaskText}>
            There are no upcoming appointments.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CreateAppointment")}
          >
            <Text style={styles.buttonText}>Create Appointment</Text>
          </TouchableOpacity>
        </View>
      )}
      {activeList === "today" && !loading && todayTasks.length > 0 && (
        <View style={styles.appListContainer}>
          <FlatList
            data={todayTasks}
            renderItem={renderTask}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      )}
      {activeList === "upcoming" && !loading && upcomingTasks.length > 0 && (
        <View style={styles.appListContainer}>
          <FlatList
            data={[...upcomingTasks, ...overdueTasks]}
            renderItem={renderTask}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default UpcomingAppt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 6,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "lightgrey",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  toggleButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#007AFF",
  },
  activeButtonl: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 10,
    justifyContent: "center",
    borderTopLeftRadius: 6,
  },
  activeButtonr: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 10,
    justifyContent: "center",
    borderTopRightRadius: 6,
  },
  inactiveButton: {
    flex: 1,
    padding: 10,
  },
  activeButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  activeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  inactiveButtonText: {
    color: "#007AFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  appListContainer: {
    width: "100%",
    padding: 10,
    height: 300,
  },
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    backgroundColor: "rgba(0, 122, 255, 0.2)",
    marginBottom: 10,
    width: "100%",
    padding: 20,
    borderRadius: 6,
  },
  noTaskContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
  noTaskText: {
    textAlign: "center",
    color: "grey",
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  userDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  userDetails: {
    alignItems: "center",
  },
  profileContainer: {
    position: "relative",
    width: 50,
    height: 50,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute",
  },
  profileTop: {
    zIndex: 2,
    left: 10,
  },
  profileBottom: {
    zIndex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "grey",
  },
  taskDate: {
    fontSize: 14,
    color: "grey",
  },
  bottom: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 10,
  },
  username: {
    position: "absolute",
    right: 20,
    top: 20,
    fontWeight: "bold",
    fontSize: 12,
    color: "#007AFF",
    textTransform: "uppercase",
  },
});
