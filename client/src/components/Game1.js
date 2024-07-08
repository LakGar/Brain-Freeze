import React, { useState } from "react";
import { StyleSheet, View, Button, Modal } from "react-native";
import WebView from "react-native-webview";

const Game1 = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenBrowser = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    // You might want to handle additional logic after the browser closes
  };

  return (
    <View style={styles.container}>
      <Button title="Play Mind Game" onPress={handleOpenBrowser} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <WebView
          source={{ uri: "https://your-mind-game-website.com" }}
          onMessage={(event) => {
            // Handle messages received from the web page
            console.log(event.nativeEvent.data);
            handleClose();
          }}
          javaScriptEnabled={true}
        />
      </Modal>
    </View>
  );
};

export default Game1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
