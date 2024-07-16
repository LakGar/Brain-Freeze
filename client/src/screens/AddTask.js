import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../store/authSlice";
import { createTask } from "../store/taskSlice";

const AddTask = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken && !userInfo) {
      dispatch(getUserInfo(userToken));
    }
  }, [dispatch, userToken, userInfo]);

  if (!userInfo) {
    return null;
  }

  const handleSaveTask = () => {
    const taskData = {
      type: taskType,
      status: status,
      dueAt: dueAt,
      description: description,
      title: title,
      createdFor: userInfo._id,
      createdBy: userInfo._id,
      doctorNotes: "",
    };
    dispatch(createTask({ token: userToken, taskData }));
    navigation.navigate("Task");
  };
  const [taskType, setTaskType] = useState("task");
  const [status, setStatus] = useState("due");
  const [dueAt, setDueAt] = useState(new Date());
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDueDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueAt;
    setShowDatePicker(false);
    setDueAt(currentDate);
  };
  const taskTypes = ["task", "appointment", "prescription"];
  const statuses = ["due", "in progress", "completed", "missed"];

  const renderButtonGroup = (options, selected, setter) =>
    options.map((option) => (
      <TouchableOpacity
        key={option}
        style={[
          styles.toggleButton,
          selected === option && styles.selectedButton,
        ]}
        onPress={() => setter(option)}
      >
        <Text
          style={[
            styles.toggleButtonText,
            selected === option && styles.selectedButtonText,
          ]}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Task")}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>New Task</Text>
        <Icon name="chevron-back" size={24} color="transparent" />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description"
          multiline={true}
        />
      </View>

      <View style={styles.formGroup2}>
        <Text style={styles.label}>Due Date</Text>

        <DateTimePicker
          value={dueAt}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChangeDueDate}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.buttonGroup}>
          {renderButtonGroup(statuses, status, setStatus)}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveTask}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingVertical: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4D66FB",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    fontSize: 16,
    color: "#333",
    marginVertical: 10,
    paddingVertical: 10,
  },
  textArea: {
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    paddingVertical: 10,
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
    height: 90,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 3,
    paddingVertical: 10,
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#4D66FB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    borderColor: "white",
  },
  toggleButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
  selectedButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  button: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#4D66FB",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    bottom: 40,
    right: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddTask;
