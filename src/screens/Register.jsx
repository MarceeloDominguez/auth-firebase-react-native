import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { FormControl, Input, Button, Icon } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import Title from "../components/Title";
import QuestionText from "../components/QuestionText";
import LineDivider from "../components/LineDivider";
import { useAuth } from "../context/AuthProvider";
import Loading from "../components/Loading";

export default function Register({ navigation }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { register } = useAuth();

  const handleChange = (value, field) => {
    setUser({ ...user, [field]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (user.email !== "" && user.password !== "") {
        await register(user.email, user.password);
        setLoading(false);
      } else {
        Alert.alert("Error", "The email and password fields cannot be empty", [
          { text: "OK" },
        ]);
      }
      navigate("home");
      setUser({});
    } catch (error) {
      setError(error.code);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title title="Register" />
        <FormControl
          isInvalid={
            error === "auth/invalid-email" || error === "auth/user-not-found"
              ? true
              : false
          }
          style={styles.containerInput}
        >
          <FormControl.Label _text={styles.label}>Email</FormControl.Label>
          <Input
            placeholder="Enter email"
            value={user.email}
            onChangeText={(value) => handleChange(value, "email")}
            type="text"
          />
          <FormControl.ErrorMessage>Invalid Email</FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            error === "auth/wrong-password" || error === "auth/weak-password"
              ? true
              : false
          }
          style={styles.containerInput}
        >
          <FormControl.Label _text={styles.label}>Password</FormControl.Label>
          <Input
            placeholder="Enter password"
            value={user.password}
            onChangeText={(value) => handleChange(value, "password")}
            type={show ? "text" : "password"}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={<Ionicons name={show ? "eye" : "eye-off"} />}
                  size={5}
                  mr={2}
                />
              </Pressable>
            }
          />
          <FormControl.ErrorMessage>
            Incorrect password. Must have 6 or more characters.
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          _text={styles.textButton}
          style={styles.buttonSignIn}
          colorScheme="primary"
          onPress={() => handleSubmit()}
        >
          Register
        </Button>
        <QuestionText
          question="You already have an account?"
          navigateTo="Login"
          onPress={() => navigation.navigate("login")}
        />
        <LineDivider />
        <Button
          _text={styles.textButton}
          style={styles.buttonLoginGoogle}
          leftIcon={<Icon as={Ionicons} name="logo-google" />}
          colorScheme="darkBlue"
        >
          Continue with Google
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#e1f5fe",
  },
  containerInput: {
    paddingBottom: 12,
  },
  label: {
    letterSpacing: 1,
    fontSize: 12,
  },
  buttonSignIn: {
    marginTop: 20,
    letterSpacing: 2,
    borderRadius: 10,
  },
  buttonLoginGoogle: {
    marginTop: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    letterSpacing: 0.5,
  },
});
