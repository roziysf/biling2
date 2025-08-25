import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

export default function PaymentSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { trxData } = route.params; // Data awal dari PaymentDetailsScreen

  const [status, setStatus] = useState(trxData.status); // status awal Tripay
  const [detail, setDetail] = useState(trxData); // update detail jika ada perubahan
  const reference = trxData.reference; // reference transaksi

  // Fungsi cek status ke API
  const checkStatus = async () => {
    try {
      const res = await fetch(
        `https://rozi.isnupasuruan.or.id/Api/trx.php?reference=${reference}`
      );
      const json = await res.json();

      if (json.success) {
        console.log("✅ Update status dari API:", json);

        if (json.tripay) {
          setStatus(json.status); // PAID / UNPAID
          setDetail(json.tripay); // update detail transaksi Tripay terbaru
        }
      } else {
        console.log("⚠️ Gagal cek status:", json.message);
      }
    } catch (err) {
      console.log("❌ Error cek status:", err);
    }
  };

  // Auto refresh status hanya saat screen aktif
  useFocusEffect(
    useCallback(() => {
      console.log("✅ Screen PaymentSuccess aktif, mulai cek status...");
      const interval = setInterval(() => {
        checkStatus();
      }, 5000);

      return () => {
        console.log("⏹ Screen PaymentSuccess tidak aktif, hentikan interval.");
        clearInterval(interval);
      };
    }, [])
  );

  const isPaid = status === "PAID";

  return (
    <View style={styles.container}>
      {/* Dynamic Icon */}
      <View style={styles.iconContainer}>
        <Icon
          name={isPaid ? "check-circle" : "clock"}
          size={128}
          color={isPaid ? "#4CAF50" : "#FF9800"}
        />
      </View>

      <Text style={styles.title}>
        {isPaid ? "Pembayaran Sukses" : "Menunggu Pembayaran"}
      </Text>
      <Text style={styles.description}>
        {isPaid
          ? "Transaksi Anda telah berhasil. Periksa detail pembayaran di bawah ini atau lihat riwayat transaksi Anda."
          : "Transaksi Anda sedang menunggu pembayaran. Segera lakukan pembayaran sebelum waktu habis."}
      </Text>

      {/* Detail Transaksi */}
      <View style={styles.card}>
        <Text style={styles.label}>Trx:</Text>
        <Text style={styles.value}>{detail.merchant_ref}</Text>

        <Text style={styles.label}>Metode:</Text>
        <Text style={styles.value}>{detail.payment_name}</Text>

        <Text style={styles.label}>Kode Pembayaran:</Text>
        <Text style={styles.value}>{detail.pay_code}</Text>

        <Text style={styles.label}>Jumlah:</Text>
        <Text style={styles.value}>
          Rp {detail.amount?.toLocaleString("id-ID")}
        </Text>

        <Text style={styles.label}>Status:</Text>
        <Text
          style={[
            styles.value,
            { color: isPaid ? "#4CAF50" : "#FF9800", fontWeight: "600" },
          ]}
        >
          {status}
        </Text>
      </View>

      {/* Tombol Manual ke Riwayat */}
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
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    width: width - 48,
    marginBottom: 32,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    marginTop: 6,
  },
  value: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#007FFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
