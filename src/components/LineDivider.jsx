import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "native-base";

export default function LineDivider() {
  return (
    <View style={styles.line}>
      <Divider w={"40%"} style={styles.colorLine} />
      <Text style={styles.lineText}>Or with</Text>
      <Divider w={"40%"} style={styles.colorLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  lineText: {
    letterSpacing: 0.5,
    color: "#212121",
  },
  colorLine: {
    backgroundColor: "#212121",
  },
});
