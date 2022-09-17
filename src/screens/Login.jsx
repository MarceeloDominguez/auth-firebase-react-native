import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FormControl, Input, Button, Icon } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import LineDivider from "../components/LineDivider";
import QuestionText from "../components/QuestionText";
import Title from "../components/Title";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthProvider";

export default function Login({ navigation }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { login } = useAuth();

  const { top } = useSafeAreaInsets();

  const handleChange = (value, field) => {
    setUser({ ...user, [field]: value });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (user.email !== "" && user.password !== "") {
        await login(user.email, user.password);
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
    <SafeAreaView style={{ marginTop: top, ...styles.container }}>
      <ScrollView>
        <StatusBar backgroundColor="#e1f5fe" barStyle="dark-content" />
        <Title title="Sign In" />
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
        <TouchableOpacity onPress={() => navigation.navigate("resetPassword")}>
          <Text style={styles.forgetPassword}>Forget password?</Text>
        </TouchableOpacity>
        <Button
          _text={styles.textButton}
          style={styles.buttonSignIn}
          onPress={() => handleSubmit()}
        >
          Sign In
        </Button>
        <QuestionText
          question="Don't have an account?"
          navigateTo="Register"
          onPress={() => navigation.navigate("register")}
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
  forgetPassword: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
});
