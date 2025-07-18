import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [active, setActive] = useState("Paket");

  const menuItems = [
    { key: "Profile", icon: "user", label: "Profile", screen: "Profile" },
    { key: "Paket", icon: "file-text", label: "Daftar Paket", screen: "InternetPackages" },
    { key: "Riwayat", icon: "clock", label: "Riwayat", screen: "PaymentHistory" },
    { key: "Admin", icon: "shield", label: "Admin", screen: "AdminScreen" }, // ← Bot/Admin icon
  ];

  return (
    <View style={styles.container}>
      {/* Dekorasi Header */}
      <View style={styles.decorationWrapper}>
        <Icon name="gift" size={32} color="#FFF" style={styles.iconLeft} />
        <Icon name="award" size={40} color="#FFD700" style={styles.iconCenter} />
        <Icon name="flag" size={32} color="#FFF" style={styles.iconRight} />
      </View>

      {/* Konten Utama */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Selamat Datang Pelanggan{"\n"}Terhormat kami
        </Text>

        <View style={styles.card}>
          <View style={styles.grid}>
            {menuItems.map((item) => {
              const isActive = active === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.gridItem,
                    isActive ? styles.activeItem : styles.inactiveItem,
                  ]}
                  onPress={() => {
                    setActive(item.key);
                    if (item.screen) navigation.navigate(item.screen as never);
                  }}
                >
                  <Icon
                    name={item.icon}
                    size={40}
                    color={isActive ? "#FFF" : "#000"}
                  />
                  <Text
                    style={[
                      styles.iconLabel,
                      { color: isActive ? "#FFF" : "#000" },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  decorationWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    gap: 24,
  },
  iconLeft: {
    transform: [{ rotate: "-20deg" }],
  },
  iconCenter: {
    marginHorizontal: 24,
  },
  iconRight: {
    transform: [{ rotate: "20deg" }],
  },
  content: {
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    width: "100%",
  },
  welcomeText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    marginTop: 8,
    lineHeight: 30,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 28,
    borderRadius: 20,
    width: 340,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    rowGap: 20,
    columnGap: 12,
  },
  gridItem: {
    width: "42%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  activeItem: {
    backgroundColor: "#007FFF",
  },
  inactiveItem: {
    backgroundColor: "#F3F4F6",
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },
});
