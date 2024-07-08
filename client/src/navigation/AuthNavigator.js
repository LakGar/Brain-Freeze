// src/navigation/AuthNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen1 from "../screens/RegisterScreen1";
import RegisterScreen2 from "../screens/RegisterScreen2";
import RegisterScreen3 from "../screens/RegisterScreen3";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register1" component={RegisterScreen1} />
      <AuthStack.Screen name="Register2" component={RegisterScreen2} />
      <AuthStack.Screen name="Register3" component={RegisterScreen3} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
