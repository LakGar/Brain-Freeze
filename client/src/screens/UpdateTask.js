import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask, fetchTaskById } from "../store/taskSlice";

const UpdateDeleteTask = ({ navigation, route }) => {
  const userToken = useSelector((state) => state.auth.userToken);
  const { taskId } = route.params;
  const dispatch = useDispatch();
  const { currentTask, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskById({ token: userToken, taskId }));
  }, [dispatch, taskId, userToken]);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    type: "task",
    status: "due",
    dueAt: new Date(),
  });

  useEffect(() => {
    if (currentTask) {
      setTaskData(currentTask);
    }
  }, [currentTask]);

  const handleInputChange = (field, value) => {
    setTaskData({ ...taskData, [field]: value });
  };

  const handleSaveTask = () => {
    dispatch(updateTask({ token: userToken, taskId, updateData: taskData }));
    navigation.navigate("Task");
  };

  const handleCompleteTask = async () => {
    handleInputChange("status", "completed");
    await handleSaveTask(); // This saves and navigates upon completion
  };

  const handleDeleteTask = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteTask({ token: userToken, taskId }));
            navigation.navigate("Task");
          },
        },
      ]
    );
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>Update Task</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formInputs}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={taskData.title}
              onChangeText={(text) => handleInputChange("title", text)}
              placeholder="Enter task title"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              value={taskData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              placeholder="Enter task description"
              multiline={true}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Task Type</Text>
            <View style={styles.buttonGroup}>
              {renderButtonGroup(taskTypes, taskData.type, (type) =>
                handleInputChange("type", type)
              )}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.buttonGroup}>
              {renderButtonGroup(statuses, taskData.status, (status) =>
                handleInputChange("status", status)
              )}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Due Date</Text>
            <DateTimePicker
              value={new Date(taskData.dueAt)}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                handleInputChange("dueAt", selectedDate || taskData.dueAt);
              }}
            />
          </View>
        </View>
        <View style={styles.ExitButtonContainer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleCompleteTask}
          >
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
          <View style={styles.updateDeleteButtonContainer}>
            <TouchableOpacity
              style={[styles.button, !taskData.title && styles.buttonDisabled]}
              onPress={handleSaveTask}
              disabled={!taskData.title}
            >
              <Text style={styles.buttonText}>Update Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={handleDeleteTask}
            >
              <Text style={styles.buttonText}>Delete Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#d9d9d9",
    paddingVertical: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  heading: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    color: "#4D66FB",
    width: "100%",
    textAlign: "center",
    top: 0,
    zIndex: -1,
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
    flex: 1,
    backgroundColor: "#4D66FB",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
    opacity: 0.6,
  },
  updateDeleteButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#CCC",
  },
  ExitButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonDelete: {
    flex: 1,
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default UpdateDeleteTask;
