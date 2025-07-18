import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

export default function BottomNavigation() {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route.name;

  let isDashboard = false;
  let isInternetPackages = false;
  let isPaymentHistory = false;

  if (currentRoute === "Dashboard") {
    isDashboard = true;
  } else if (currentRoute === "InternetPackages") {
    isInternetPackages = true;
  } else if (currentRoute === "PaymentHistory") {
    isPaymentHistory = true;
  }

  return (
    <View style={styles.bottomNavWrapper}>
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Dashboard" as never)}
          style={isDashboard ? styles.activeCircle : undefined}
        >
          <Feather
            name="home"
            size={24}
            color={isDashboard ? "#007FFF" : "#FFF"}
          />
        </TouchableOpacity>

        {/* Paket */}
        <TouchableOpacity
          onPress={() => navigation.navigate("InternetPackages" as never)}
          style={isInternetPackages ? styles.activeCircle : undefined}
        >
          <Feather
            name="file-text"
            size={24}
            color={isInternetPackages ? "#007FFF" : "#FFF"}
          />
        </TouchableOpacity>

        {/* History */}
        <TouchableOpacity
          onPress={() => navigation.navigate("PaymentHistory" as never)}
          style={isPaymentHistory ? styles.activeCircle : undefined}
        >
          <Feather
            name="clock"
            size={24}
            color={isPaymentHistory ? "#007FFF" : "#FFF"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavWrapper: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#007FFF",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 32,
    justifyContent: "space-between",
    alignItems: "center",
    width: width * 0.7,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  activeCircle: {
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
