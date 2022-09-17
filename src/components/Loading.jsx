import { HStack, Spinner } from "native-base";
import React from "react";
import { View, Text } from "react-native";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Spinner size="lg" />
    </View>
  );
}
