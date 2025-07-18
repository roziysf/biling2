import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login" as never); // Ganti "Home" sesuai dengan nama route-mu
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Background Decorative Elements */}
      <View style={styles.bgContainer}>
        {/* Blue Circle Top Left */}
        <View style={[styles.circle, styles.circleTopLeft]} />

        {/* White Diagonal Stripes */}
        {[...Array(5)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.stripe,
              {
                left: 23 - i * 20,
                top: -84 + i * 30,
              },
            ]}
          />
        ))}

        {/* Blue Circle Bottom Right */}
        <View style={styles.circleBottomRight} />

        {/* Lime Circle Bottom Left */}
        <View style={styles.limeCircleBottomLeft} />

        {/* Small Blue Circle */}
        <View style={styles.smallBlueCircle} />

        {/* Bottom Right White Diagonal Stripes */}
        {[...Array(5)].map((_, i) => (
          <View
            key={`bottom-${i}`}
            style={[
              styles.bottomStripe,
              {
                width:
                  i === 2 || i === 3
                    ? 220
                    : i === 4
                    ? 186
                    : 169,
                right: 216 - i * 20,
                bottom: 200 - i * 30,
              },
            ]}
          />
        ))}
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoCircle}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/e777359f10808301c0e802070b486578329ee650?width=396",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Company Info */}
        <Text style={styles.companyName}>PT Lintas Data Prima</Text>
        <Text style={styles.tagline}>Penyedia Layanan Internet Terbaik</Text>
      </View>

      {/* Spinner */}
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#007FFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
  bgContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    width: 240,
    height: 240,
    backgroundColor: "#007FFF",
    borderRadius: 120,
    position: "absolute",
  },
  circleTopLeft: {
    left: -135,
    top: -162,
  },
  stripe: {
    position: "absolute",
    width: 176,
    height: 16,
    backgroundColor: "#FFF",
    transform: [{ rotate: "50deg" }],
  },
  circleBottomRight: {
    position: "absolute",
    width: 151,
    height: 120,
    backgroundColor: "#007FFF",
    borderRadius: 100,
    right: -100,
    bottom: 100,
    transform: [{ rotate: "176deg" }],
  },
  limeCircleBottomLeft: {
    position: "absolute",
    width: 80,
    height: 241,
    backgroundColor: "#D3E818",
    borderRadius: 120,
    left: -166,
    bottom: 200,
    transform: [{ rotate: "176deg" }],
  },
  smallBlueCircle: {
    position: "absolute",
    width: 56,
    height: 56,
    backgroundColor: "#007FFF",
    borderRadius: 28,
    left: 14,
    bottom: 300,
    transform: [{ rotate: "176deg" }],
  },
  bottomStripe: {
    position: "absolute",
    height: 16,
    backgroundColor: "#FFF",
    transform: [{ rotate: "-133deg" }],
  },
  content: {
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoCircle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 192,
    height: 176,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  spinnerContainer: {
    position: "absolute",
    bottom: 80,
    left: width / 2 - 16,
  },
});
