import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedProgressWheel from "react-native-progress-wheel";
const DailySummary = () => {
  return (
    <View style={styles.weeklySummaryContainer}>
      <Text style={styles.heading}>Daily Summary</Text>
      <View style={styles.mainContainer}>
        <View style={styles.dataContainer}>
          <View style={styles.data}>
            <Text style={styles.dataHeading}>Food</Text>
            <Text style={[styles.dataValue, { color: "#ff5252" }]}>
              1200/2000
              <Text style={{ fontSize: 17 }}>CAL</Text>
            </Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.dataHeading}>Exercise</Text>
            <Text style={[styles.dataValue, { color: "#be29ec" }]}>
              23/60
              <Text style={{ fontSize: 17 }}>MIN</Text>
            </Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.dataHeading}>Mental</Text>
            <Text style={[styles.dataValue, { color: "rgb(102,178,178)" }]}>
              12/30
              <Text style={{ fontSize: 17 }}>MIN</Text>
            </Text>
          </View>
        </View>
        <View style={styles.graphsContainer}>
          <View style={styles.graphContainer}>
            <AnimatedProgressWheel
              size={90}
              width={15}
              color={"#ff5252"}
              progress={50} // Set this to your progress value for 'food'
              backgroundColor={"#ffbaba"}
              rounded={true}
            />
          </View>

          <View style={styles.graphContainer}>
            <AnimatedProgressWheel
              size={120}
              width={15}
              color={"#be29ec"}
              progress={78} // Set this to your progress value for 'food'
              backgroundColor={"#efbbff"}
              rounded={true}
              delay={500}
            />
          </View>
          <View style={styles.graphContainer}>
            <AnimatedProgressWheel
              size={150}
              width={15}
              color={"rgb(102,178,178)"}
              progress={60} // Set this to your progress value for 'mental'
              backgroundColor={"rgb(178,216,216)"}
              rounded={true}
              delay={1000}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DailySummary;

const styles = StyleSheet.create({
  weeklySummaryContainer: {
    flex: 1,
    alignItems: "flex-start", // Changed from 'left' which is invalid
    padding: 20,
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  graphsContainer: {
    width: "50%",
    position: "relative",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  graphContainer: {
    position: "absolute",
  },
  mainContainer: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",

    padding: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Elevation for Android
    elevation: 4,
  },
  dataContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
  },
  data: {
    display: "flex",
    height: 60,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  dataHeading: {
    fontSize: 15,
    color: "black",
    fontWeight: "600",
    marginBottom: 20,
    padding: 0,
    margin: 0,
  },
  dataValue: {
    padding: 0,
    marginTop: -40,
    fontSize: 20,
    fontWeight: "700",
  },
});
