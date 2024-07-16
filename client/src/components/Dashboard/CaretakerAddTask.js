import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store/authSlice";
import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { addDays, format } from "date-fns";
import axios from "axios";

const CaretakerAddTask = ({ route, navigation }) => {
  const { userToken, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { patient } = route.params;
  const patientId = patient._id;
  const careTakerId = userInfo._id;

  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
    }
  }, [dispatch, userToken, userInfo]);

  const [taskType, setTaskType] = useState("appointment");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueAt, setTaskDueAt] = useState(new Date());
  const [frequency, setTaskFrequency] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState();

  const profileImageUrl =
    patient.profilePicture === "default-profile-pic.jpg"
      ? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
      : patient.profilePicture;

  const createTask = (task) => {
    axios
      .post("http://localhost:8000/api/tasks/", task, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log("Task created successfully", response.data);
      })
      .catch((error) => {
        console.error("Error creating task", error);
      });
    dispatch(getUserInfo(userToken));
    navigation.goBack();
  };

  const CreatingMultiplePrescriptions = (
    taskType,
    taskTitle,
    taskDescription,
    frequency,
    startDate,
    duration,
    userToken,
    patientId,
    careTakerId
  ) => {
    if (taskType === "appointment") {
      const task = {
        title: taskTitle,
        description: taskDescription,
        type: "appointment",
        dueAt: format(new Date(startDate), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        status: "due",
        patientId: patientId,
        careTakerId: careTakerId,
        userToken: userToken,
      };

      createTask(task);
    } else if (taskType === "prescription") {
      const tasks = [];
      for (let day = 0; day < duration; day++) {
        const currentDate = addDays(new Date(startDate), day);
        for (let time = 0; time < frequency; time++) {
          const taskDueAt = new Date(currentDate);
          taskDueAt.setHours(8 + time * Math.floor(12 / frequency)); // Adjust hours based on frequency

          const task = {
            title: taskTitle,
            description: taskDescription,
            type: "prescription",
            dueAt: format(taskDueAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
            status: "due",
            patientId: patientId,
            careTakerId: careTakerId,
            userToken: userToken,
            frequency: frequency,
          };

          tasks.push(task);
        }
      }

      tasks.forEach(createTask);
    } else {
      console.error("Invalid task type");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Create Appointment</Text>
      </View>
      <View style={styles.patientCard}>
        <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.patientName}>
            {patient.firstName} {patient.lastName}
          </Text>
          <Text style={styles.subText}>{patient.email}</Text>
        </View>
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={
            taskType === "appointment"
              ? styles.activeButton
              : styles.inactiveButton
          }
          onPress={() => setTaskType("appointment")}
        >
          <Text
            style={
              taskType === "appointment"
                ? styles.activeButtonText
                : styles.inactiveButtonText
            }
          >
            Appointment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            taskType === "prescription"
              ? styles.activeButton
              : styles.inactiveButton
          }
          onPress={() => setTaskType("prescription")}
        >
          <Text
            style={
              taskType === "prescription"
                ? styles.activeButtonText
                : styles.inactiveButtonText
            }
          >
            Prescription
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        {taskType === "prescription" ? (
          <View style={styles.form}>
            <Text style={styles.label}>Medication</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTaskTitle}
              placeholder="Enter medication"
            />
            <Text style={styles.label}>Intructions</Text>
            <TextInput
              style={styles.inputArea}
              onChangeText={setTaskDescription}
              placeholder="Enter Instructions"
              multiline={true}
            />
            <View style={styles.halfInputs}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Frequency</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setTaskFrequency}
                  placeholder="Enter frequency"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Duration</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setDuration}
                  placeholder="Enter days"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Start date</Text>
                <RNDateTimePicker
                  testID="dateTimePicker"
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setStartDate(selectedDate);
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTaskTitle}
              placeholder="Enter title"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.inputArea}
              onChangeText={setTaskDescription}
              placeholder="Enter description"
              multiline={true}
            />
            <View style={styles.dateInput}>
              <Text style={styles.label}>Due date</Text>
              <RNDateTimePicker
                testID="dateTimePicker"
                value={taskDueAt}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => {
                  setTaskDueAt(selectedDate);
                }}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() =>
            CreatingMultiplePrescriptions(
              taskType,
              taskTitle,
              taskDescription,
              frequency,
              startDate,
              duration,
              userToken,
              patientId,
              careTakerId
            )
          }
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CaretakerAddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  cancelButton: {
    position: "absolute",
    left: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  patientCard: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  patientName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 12,
    color: "#888",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
  activeButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  inactiveButton: {
    backgroundColor: "#A1A1A1",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  activeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  inactiveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    width: "100%",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
    width: "100%",
    marginTop: 10,
    color: "#A1A1A1",
  },
  input: {
    borderColor: "grey",
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
  },
  inputArea: {
    borderColor: "grey",
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "white",
    color: "black",
    height: 100,
  },
  halfInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  dateInput: {
    flexDirection: "row",
    width: "45%",
    justifyContent: "center",
  },
});
