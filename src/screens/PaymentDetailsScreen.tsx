import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Clipboard from "@react-native-clipboard/clipboard";
import Icon from "react-native-vector-icons/Feather";

export default function PaymentDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { speed, price, duration, method } = route.params;

  const [loading, setLoading] = useState(true);
  const [trxData, setTrxData] = useState<any>(null);
  const [openInstructions, setOpenInstructions] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const cleanAmount = formatPriceToNumber(price);

    const url = `http://192.168.43.233/pkn_ldpp/Api/payment.php?method=${method}&merchant_ref=TX${Date.now()}&amount=${cleanAmount}&customer_name=UserApp&customer_email=user@app.com&customer_phone=081234567890`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          console.log(json.data);
          setTrxData(json.data);
        } else {
          Alert.alert("Gagal", json.message || "Gagal membuat transaksi");
        }
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Error", "Tidak dapat menghubungi server");
      })
      .finally(() => setLoading(false));
  }, [method]);

  const formatPriceToNumber = (price: string): number => {
    return Number(price.replace(/[^0-9]/g, ""));
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("Disalin", "Nomor Virtual Account telah disalin ke clipboard");
  };

  if (loading) {
    return (
      <View style={[styles.safeArea, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#007FFF" />
        <Text>Memproses transaksi...</Text>
      </View>
    );
  }

  if (!trxData) {
    return (
      <View style={[styles.safeArea, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Gagal memuat data transaksi</Text>
      </View>
    );
  }

  const toggleInstruction = (title: string) => {
    setOpenInstructions((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Paket Info */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Nama : {speed}</Text>
          <Text style={styles.cardText}>Paket : {price}</Text>
          <Text style={styles.cardText}>Durasi : {duration}</Text>
          <Text style={styles.cardText}>Metode : {trxData.payment_name}</Text>
          <Text style={styles.cardText}>Total Bayar : Rp {trxData.amount.toLocaleString()}</Text>
        </View>

        {/* Kode Pembayaran / VA */}
        <Text style={styles.sectionTitle}>Kode Pembayaran</Text>
        <View style={styles.transferBox}>
          <Text selectable style={styles.transferText}>{trxData.pay_code}</Text>
          <TouchableOpacity
            onPress={() => copyToClipboard(trxData.pay_code)}
            style={styles.copyButton}
          >
            <Icon name="copy" size={16} color="#007FFF" />
            <Text style={styles.copyText}>salin</Text>
          </TouchableOpacity>
        </View>

        {/* Instructions dari API */}
        <Text style={styles.sectionTitle}>Cara Pembayaran</Text>
        {trxData.instructions?.map((instruction: any, idx: number) => (
          <View key={idx}>
            <TouchableOpacity
              onPress={() => toggleInstruction(instruction.title)}
              style={styles.toggleHeader}
            >
              <Text style={styles.instructionTitle}>{instruction.title}</Text>
              <Icon
                name={openInstructions[instruction.title] ? "chevron-up" : "chevron-down"}
                size={20}
                color="#007FFF"
              />
            </TouchableOpacity>

            {openInstructions[instruction.title] && (
              <View style={styles.card}>
                {instruction.steps.map((step: string, stepIdx: number) => (
                  <View key={stepIdx} style={styles.instructionItem}>
                    <Text style={styles.stepNumber}>{stepIdx + 1}.</Text>
                    <Text style={styles.stepText}>{step.replace(/<[^>]+>/g, "")}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Tombol */}
<View style={styles.buttonContainer}>
  <TouchableOpacity
    onPress={() =>
      navigation.navigate("PaymentSuccess" as never, {
        trxData, // Kirim seluruh data transaksi
      })
    }
    style={styles.submitButton}
  >
    <Text style={styles.submitText}>Konfirmasi Pembayaran</Text>
  </TouchableOpacity>
</View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 20 },
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardText: { fontSize: 14, color: "#000", marginBottom: 4 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  transferBox: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transferText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  copyButton: { flexDirection: "row", alignItems: "center" },
  copyText: { fontSize: 12, color: "#007FFF", marginLeft: 6 },
  toggleHeader: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  instructionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
  instructionItem: { flexDirection: "row", marginBottom: 8 },
  stepNumber: { fontWeight: "bold", marginRight: 8, fontSize: 12 },
  stepText: { fontSize: 12, color: "#000", flex: 1 },
  buttonContainer: { alignItems: "center", marginTop: 20 },
  submitButton: {
    backgroundColor: "#007FFF",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitText: { color: "#FFF", fontSize: 16, fontWeight: "500" },
});
