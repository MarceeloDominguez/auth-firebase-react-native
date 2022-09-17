import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import { useAuth } from "../context/AuthProvider";
import { Text, View } from "react-native";
import Loading from "../components/Loading";
import ResetPassword from "../screens/ResetPassword";

const Stack = createNativeStackNavigator();

const StackLoginApp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerTransparent: true, title: "" }}
        name="login"
        component={Login}
      />
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#e1f5fe" },
        }}
        name="register"
        component={Register}
      />
      <Stack.Screen
        options={{ headerTransparent: true, title: "" }}
        name="resetPassword"
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

const StackHomeApp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerTransparent: true, title: "" }}
        name="home"
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <NavigationContainer>
      {!user ? <StackLoginApp /> : <StackHomeApp />}
    </NavigationContainer>
  );
}
