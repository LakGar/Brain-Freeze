import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AddPostScreen from "../screens/AddPostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";
import TaskScreen from "../screens/TaskScreen";
import ExploreScreen from "../screens/ExploreScreen";
import { useSelector } from "react-redux";
import { ActivityIndicator, View } from "react-native";
import DashboardScreen from "../screens/DashboardScreen";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  // Debugging: Log userInfo to check its value
  console.log("userInfo:", userInfo);

  if (!userInfo) {
    // Show a loading spinner if userInfo is not available
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const userType = userInfo.userType; // Destructure userType from userInfo
  console.log("userType:", userType);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              color = focused ? "#0026f7" : "black";
              break;
            case "Explore":
              iconName = focused ? "search" : "search-outline";
              color = focused ? "#0026f7" : "black";
              break;
            case "AddPost":
              iconName = focused ? "add-circle" : "add-circle-outline";
              color = focused ? "#0026f7" : "black";
              size = 34;
              break;
            case "Task":
              iconName = focused
                ? "checkmark-circle"
                : "checkmark-circle-outline";
              color = focused ? "#0026f7" : "black";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              color = focused ? "#0026f7" : "black";
              break;
            case "Dashboard":
              iconName = focused ? "grid" : "grid-outline";
              color = focused ? "#0026f7" : "black";
              break;
            default:
              break;
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        headerShown: false,
      })}
    >
      {userType === "Caretaker" || userType === "Doctor" ? (
        <>
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : userType === "Family" ? (
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="AddPost" component={AddPostScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Explore" component={ExploreScreen} />
          <Tab.Screen name="AddPost" component={AddPostScreen} />
          <Tab.Screen name="Task" component={TaskScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default MainNavigator;
