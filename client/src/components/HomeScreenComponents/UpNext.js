import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, FlatList } from "react-native";

const UpNext = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Continue reading</Text>
        <Button
          title="See all"
          onPress={() => navigation.navigate("AllTasksScreen")}
        />
      </View>
      <View style={styles.body}></View>
    </View>
  );
};

export default UpNext;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
  },
  body: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  list: {
    width: "100%",
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
