import React, { useState } from "react";
import { FormControl, Input, Button } from "native-base";
import { View, Alert, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthProvider";

export default function ResetPassword() {
  const [email, setEmail] = useState({ email: "" });
  const [error, setError] = useState();
  const { resetPassword } = useAuth();

  const handleChange = (value, field) => {
    setEmail({ ...email, [field]: value });
  };

  const handleResetPassword = async () => {
    setError("");
    try {
      await resetPassword(email.email);
      Alert.alert(
        "Send",
        "We sent you an email with a link to reset your password",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.log(error);
      setError(error.code);
    }
  };

  return (
    <View style={styles.container}>
      <FormControl
        isInvalid={
          error === "auth/invalid-email" || error === "auth/user-not-found"
            ? true
            : false
        }
      >
        <FormControl.Label _text={styles.label}>Email</FormControl.Label>
        <Input
          placeholder="Enter email"
          value={email.email}
          onChangeText={(value) => handleChange(value, "email")}
          type="text"
        />
        <FormControl.ErrorMessage>Invalid Email</FormControl.ErrorMessage>
      </FormControl>
      <Button onPress={handleResetPassword} style={{ marginTop: 20 }}>
        Reset password
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 16,
    backgroundColor: "#e1f5fe",
    flex: 1,
  },
  label: {
    letterSpacing: 1,
    fontSize: 12,
  },
});
