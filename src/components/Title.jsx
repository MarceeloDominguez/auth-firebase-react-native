import { Text, StyleSheet } from "react-native";
import React from "react";

export default function Title({ title }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 24,
    paddingVertical: 34,
    fontFamily: "Rubik",
    color: "#212121",
  },
});
