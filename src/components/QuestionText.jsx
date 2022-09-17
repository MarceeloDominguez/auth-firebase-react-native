import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function QuestionText({ question, navigateTo, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textQuestion}>{question}</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <Text style={styles.textNavigateTo}>{navigateTo}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    color: "#212121",
  },
  textQuestion: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  textNavigateTo: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#01579b",
  },
});
