import React, { useState } from "react";
import { Button } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthProvider";
import Loading from "../components/Loading";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome: {user.email} </Text>
      <Button colorScheme="primary" onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
