import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addWeight,
  addSteps,
  addExercise,
  addMentalExercise,
} from "../../store/authSlice";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const MetricModal = ({ visible, onClose, metric }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userToken);
  const userId = useSelector((state) => state.auth.userInfo?._id);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const bmiColors = {
    Under: "#FFA500", // Orange
    Standard: "#00FF00", // Green
    Heavy: "#FFD700", // Gold
    Over: "#FF0000", // Red
  };
  const handleAddMetric = () => {
    const payload = { token, userId, [metric]: parseInt(value) };
    console.log("Payload:", payload); // Log the payload to see if it's correct

    switch (metric) {
      case "weight":
        dispatch(addWeight(payload));
        break;
      case "steps":
        dispatch(addSteps(payload));
        break;
      case "exercise":
        dispatch(addExercise(payload));
        break;
      case "mentalExercise":
        dispatch(addMentalExercise(payload));
        break;
      default:
        break;
    }

    onClose();
  };

  const data = userInfo && userInfo[metric] ? userInfo[metric] : [];
  const latestValue = data.length > 0 ? data[data.length - 1].value : null; // Access the value

  const calculateBMI = (weight) => {
    const heightInMeters = 1.75; // example height in meters
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    let description = "";
    if (bmi <= 18.5) {
      description = "Under";
    } else if (bmi <= 24.9) {
      description = "Standard";
    } else if (bmi <= 29.9) {
      description = "Heavy";
    } else {
      description = "Over";
    }
    return { bmi, description };
  };

  const calculateCaloriesBurned = (steps) => {
    return (steps * 0.04).toFixed(0); // simple calories burned estimation
  };

  const getMetricTitle = (metric) => {
    switch (metric) {
      case "weight":
        return "kg";
      case "steps":
        return "Steps";
      case "exercise":
        return "min";
      case "mentalExercise":
        return "min";
      default:
        return "";
    }
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  const RenderBMIScale = ({ description }) => {
    return (
      <View style={styles.bmiScaleContainer}>
        <View
          style={[styles.bmiScale, { backgroundColor: bmiColors[description] }]}
        ></View>
        <Text style={[styles.subText, { color: bmiColors[description] }]}>
          {description}
        </Text>
      </View>
    );
  };

  const bmiData = latestValue !== null ? calculateBMI(latestValue) : null;

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add {metric}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setValue}
            keyboardType="numeric"
            placeholder={`Enter ${metric} value`}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAddMetric}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {data.length > 0 && (
            <>
              <Text style={styles.chartTitle}>
                {latestValue}{" "}
                <Text style={styles.chartSubTitle}>
                  {getMetricTitle(metric)}
                </Text>
              </Text>
              <LineChart
                data={{
                  labels: data.map((entry) => getFormattedDate(entry.date)),
                  datasets: [
                    {
                      data: data.map((entry) => entry.value),
                    },
                  ],
                }}
                bezier
                width={screenWidth - 80}
                height={220}
                withVerticleLines={false}
                yAxisLabel=""
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  withVerticleLines: "false",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: "", // solid lines
                    stroke: "grey",
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: bmiColors[bmiData?.description || "Standard"],
                    fill: "#fff",
                  },
                }}
                style={{
                  marginVertical: 8,
                }}
              />
            </>
          )}

          {metric === "weight" && bmiData && (
            <View style={styles.bmiContainer}>
              <Text
                style={[
                  styles.subText,
                  { color: bmiColors[bmiData.description] },
                ]}
              >
                Your BMI
              </Text>
              <Text
                style={[
                  styles.bmiText,
                  { color: bmiColors[bmiData.description] },
                ]}
              >
                {bmiData.bmi}
              </Text>
              <View style={styles.bmiGroups}>
                <RenderBMIScale description="Under" />
                <RenderBMIScale description="Standard" />
                <RenderBMIScale description="Heavy" />
                <RenderBMIScale description="Over" />
              </View>
            </View>
          )}

          {metric === "steps" && latestValue !== null && (
            <Text style={styles.bmiText}>
              Calories Burned: {calculateCaloriesBurned(latestValue)} kcal
            </Text>
          )}

          {metric === "exercise" && latestValue !== null && (
            <Text style={styles.bmiText}>
              Daily Goal: {latestValue >= 30 ? "Met" : "Not Met"}
            </Text>
          )}

          {metric === "mentalExercise" && latestValue !== null && (
            <Text style={styles.bmiText}>
              Daily Goal: {latestValue >= 30 ? "Met" : "Not Met"}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MetricModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: screenWidth - 40,
    padding: 20,
    height: "87%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#9999ff",
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#7a83ff",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  chartTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  chartSubTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "grey",
    marginTop: 5,
  },
  bmiContainer: {
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 6,
    padding: 10,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontSize: 12,
    fontWeight: "600",
    color: "grey",
  },
  bmiText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 3,
    textAlign: "center",
  },
  bmiGroups: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    gap: 5,
  },
  bmiScaleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flex: 1,
  },
  bmiScale: {
    width: "100%",
    height: 7,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
});
