import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

export default function PaymentSuccessScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("PaymentHistory" as never);
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Success icon (SVG custom equivalent) */}
      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={128} color="#ECB43C" />
      </View>

      <Text style={styles.title}>Pembayaran Sukses</Text>
      <Text style={styles.description}>
        Transaksi Anda telah berhasil diselesaikan. Untuk keterangan lebih
        lanjut, periksa riwayat transaksi Anda.
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("PaymentHistory" as never)}
        style={styles.button}
      >
        <Icon name="clock" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#007FFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
