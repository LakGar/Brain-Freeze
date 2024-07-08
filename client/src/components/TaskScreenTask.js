import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import TaskCard from "./TaskCard";

const TaskScreen = () => {
  const [tasks, setTasks] = useState([
    {
      title: "Design meeting",
      time: "12:00 PM",
      description: "Discuss UI/UX strategies",
      status: "Pending",
      priority: "High",
    },
    {
      title: "Development",
      time: "2:00 PM",
      description: "Deploy PWA",
      status: "In Progress",
      priority: "Medium",
    },
    // Add more tasks as needed
  ]);

  const handleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: "Completed" } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskCard
            title={item.title}
            time={item.time}
            description={item.description}
            status={item.status}
            priority={item.priority}
            onComplete={() => handleComplete(index)}
          />
        )}
      />
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "red",
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
});
