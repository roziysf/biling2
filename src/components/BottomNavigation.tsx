import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

export default function BottomNavigation() {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route.name;

  let isInternetPackages = false;
  let isPaymentHistory = false;
  let isProfile = false;
  let isAdmin = false;

  if (currentRoute === "InternetPackages") {
    isInternetPackages = true;
  } else if (currentRoute === "PaymentHistory") {
    isPaymentHistory = true;
  } else if (currentRoute === "Profile") {
    isProfile = true;
  } else if (currentRoute === "AdminScreen") {
    isAdmin = true;
  }

  return (
    <View style={styles.bottomNavWrapper}>
      <View style={styles.bottomNav}>
        {/* Internet Packages (sebagai menu utama) */}
        <TouchableOpacity
          onPress={() => navigation.navigate("InternetPackages" as never)}
          style={isInternetPackages ? styles.activeCircle : undefined}
        >
          <Feather
            name="home" // diganti ikon "home" agar terasa sebagai menu utama
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

        {/* Profile */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile" as never)}
          style={isProfile ? styles.activeCircle : undefined}
        >
          <Feather
            name="user"
            size={24}
            color={isProfile ? "#007FFF" : "#FFF"}
          />
        </TouchableOpacity>

        {/* Admin */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminScreen" as never)}
          style={isAdmin ? styles.activeCircle : undefined}
        >
          <Feather
            name="shield"
            size={24}
            color={isAdmin ? "#007FFF" : "#FFF"}
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
    width: width * 0.7, // kembali normal karena menu berkurang
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
