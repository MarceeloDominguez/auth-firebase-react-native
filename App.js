import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import Navigation from "./src/navigation/Navigation";
import { AuthProvider } from "./src/context/AuthProvider";

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik: require("./assets/fonts/Rubik-Black.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </AuthProvider>
  );
}
