// src/navigation/AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./MainNavigator";
import EditProfile from "../screens/EditProfile";
import AddExercise from "../screens/AddExercise";
import AddTask from "../screens/AddTask";
import AddWater from "../screens/AddWater";
import AddSteps from "../screens/AddSteps";
import AddBrainActivity from "../screens/AddBrainActivity";
import AddRelax from "../screens/AddRelax";
import UpdateDeleteTask from "../screens/UpdateTask";
import ArticleScreen from "../screens/ArticleScreen.js";
import QuizScreen from "../screens/QuizScreen.js";
import ResultsScreen from "../screens/ResultScreen.js";
import RegisterPatientScreen from "../screens/RegisterPatientScreen.js";
import DashboardScreen from "../screens/DashboardScreen.js";
import PatientDetailScreen from "../screens/PatientDetailScreen.js";
import CaretakerAddTask from "../components/Dashboard/CaretakerAddTask.js";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddExercise" component={AddExercise} />
      <Stack.Screen name="AddRelax" component={AddRelax} />
      <Stack.Screen name="AddBrainActivity" component={AddBrainActivity} />
      <Stack.Screen name="AddTask" component={AddTask} />
      <Stack.Screen name="AddWater" component={AddWater} />
      <Stack.Screen name="AddSteps" component={AddSteps} />
      <Stack.Screen name="UpdateTask" component={UpdateDeleteTask} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
      <Stack.Screen name="RegisterPatient" component={RegisterPatientScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
      <Stack.Screen name="CaretakerAddTask" component={CaretakerAddTask} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
