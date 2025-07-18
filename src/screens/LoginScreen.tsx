import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [showError, setShowError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.43.233/pkn_ldpp/Api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_pelanggan: username,
          no_hp: password,
        }),
      });

      const result = await response.json();
      console.log(result.data)

      if (result.status === "success") {
        setShowError(false);

        // Simpan data ke session
        await AsyncStorage.setItem("user", JSON.stringify(result.data));

        // Navigasi ke Dashboard
        navigation.navigate("Dashboard" as never);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/e777359f10808301c0e802070b486578329ee650?width=396",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {showError && (
        <Text style={styles.errorText}>
          ~ Login gagal, mohon periksa kembali username dan password yang
          digunakan
        </Text>
      )}

      <View style={styles.form}>
        <TextInput
          placeholder="User Name / ID Pelanggan"
          placeholderTextColor="#000"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Password / No HP"
          placeholderTextColor="#000"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  circleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  circle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 192,
    height: 176,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 12,
  },
  form: {
    width: "100%",
    maxWidth: 320,
    alignSelf: "center",
  },
  input: {
    height: 48,
    backgroundColor: "#F3F4F6",
    borderColor: "#4B5563",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: "#000",
  },
  loginButton: {
    height: 48,
    backgroundColor: "#F3F4F6",
    borderColor: "#4B5563",
    borderWidth: 1,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    alignSelf: "center",
    width: 128,
  },
  loginButtonText: {
    fontSize: 16,
    color: "#000",
  },
});
