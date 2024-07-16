import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MetricModal from "./MetricModal";
import { useSelector } from "react-redux";

const Metrics = ({ userInfo }) => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (metric) => {
    setSelectedMetric(metric);
    setModalVisible(true);
  };

  const renderMetricCard = (title, value, icon, color, metricKey, unit) => {
    const latestValue =
      value && value.length > 0 ? value[value.length - 1].value : null;

    return (
      <TouchableOpacity
        style={styles.metricCard}
        onPress={() => handleCardPress(metricKey)}
      >
        <Text style={styles.metricCardHeading}>{title}</Text>
        <View style={styles.graphic}>
          <MaterialIcons
            name={icon}
            size={60}
            color={color}
            style={styles.icon}
          />
        </View>
        <View style={styles.metricsDataContainer}>
          {latestValue !== null && latestValue !== undefined ? (
            <View style={styles.metricsData}>
              <Text style={styles.dataValue}>{latestValue}</Text>
              <Text style={styles.dataLabel}>{unit}</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleCardPress(metricKey)}
            >
              <Text style={styles.addButtonText}>
                Add {title.toLowerCase()}
              </Text>
            </TouchableOpacity>
          )}
          <Text style={styles.subText}>
            last updated{" "}
            {latestValue !== null && latestValue !== undefined
              ? "recently"
              : "N/A"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.metricsContainer}>
      <View style={styles.metricCardContainer}>
        {renderMetricCard(
          "WEIGHTS",
          userInfo?.weight,
          "trending-up",
          "#B50EF2",
          "weight",
          "lbs"
        )}
        {renderMetricCard(
          "STEPS",
          userInfo?.steps,
          "directions-run",
          "#ff3f3f",
          "steps",
          "steps"
        )}
        {renderMetricCard(
          "EXERCISE",
          userInfo?.exercise,
          "directions-bike",
          "#FF9413",
          "exercise",
          "min"
        )}
        {renderMetricCard(
          "MENTAL EXERCISE",
          userInfo?.MentalExercise,
          "check",
          "#00eb51",
          "mentalExercise",
          "min"
        )}
      </View>

      <MetricModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        metric={selectedMetric}
      />
    </View>
  );
};

export default Metrics;

const styles = StyleSheet.create({
  metricsContainer: {
    // paddingHorizontal: 20,
    marginVertical: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 0,
  },
  metricCardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  metricCard: {
    width: "48%",
    height: 200,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 1,
    borderColor: "lightgrey",
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  metricCardHeading: {
    color: "darkgrey",
    fontWeight: "600",
    fontSize: 13,
    letterSpacing: 1.5,
    textAlign: "left",
    width: "100%",
  },
  graphic: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  metricsDataContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  metricsData: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 3,
  },
  dataValue: {
    margin: 0,
    fontSize: 30,
    fontWeight: "700",
    color: "#000",
  },
  dataLabel: {
    color: "#000",
    fontWeight: "600",
    fontSize: 13,
    letterSpacing: 1.5,
  },
  subText: {
    color: "grey",
    fontWeight: "400",
    fontSize: 13,
    paddingBottom: 0,
  },
  AddData: {
    backgroundColor: "#7a83ff",
    color: "white",
    fontWeight: "bold",
    padding: 5,
    marginBottom: 5,
    fontSize: 18,
    marginTop: 15,
    textAlign: "center",
    width: "100%",
  },
});
