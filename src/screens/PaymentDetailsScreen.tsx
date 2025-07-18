import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Clipboard from "@react-native-clipboard/clipboard";
import Icon from "react-native-vector-icons/Feather";

export default function PaymentDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { speed, price, duration, method } = route.params;

  const [showBCAInstructions, setShowBCAInstructions] = useState(false);
  const [showBRIInstructions, setShowBRIInstructions] = useState(false);

  useEffect(() => {
    if (method === "BCA") {
      setShowBCAInstructions(true);
    } else if (method === "BRI") {
      setShowBRIInstructions(true);
    }
  }, [method]);

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("Disalin", "Nomor Virtual Account telah disalin ke clipboard");
  };

  const instructionsBCA1 = [
    "Buka aplikasi BCA Mobile.",
    "Pilih m-BCA > m-Transfer.",
    "Pilih BCA Virtual Account.",
    "Masukkan nomor VA: 8889976992682399.",
    "Masukkan nominal pembayaran.",
    "Klik OK dan masukkan PIN.",
  ];

  const instructionsBCA2 = [
    "Login ke KlikBCA Individu.",
    "Pilih menu Transfer Dana.",
    "Pilih Transfer ke BCA Virtual Account.",
    "Input nomor VA dan nominal.",
    "Konfirmasi detail transfer.",
    "Selesai.",
  ];

  const instructionsBRI1 = [
    "Buka aplikasi BRImo.",
    "Pilih menu Pembayaran.",
    "Pilih BRIVA.",
    "Masukkan nomor VA: 8889976992682399.",
    "Masukkan nominal pembayaran.",
    "Lanjutkan hingga transaksi berhasil.",
  ];

  const instructionsBRI2 = [
    "Login ke Internet Banking BRI.",
    "Pilih menu Pembayaran > BRIVA.",
    "Masukkan nomor VA dan nominal.",
    "Konfirmasi transaksi.",
    "Selesai.",
  ];

  const InstructionCard = ({ instructions }: { instructions: string[] }) => (
    <View style={styles.card}>
      {instructions.map((item, index) => (
        <View key={index} style={styles.instructionItem}>
          <Text style={styles.stepNumber}>{index + 1}.</Text>
          <Text style={styles.stepText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Icon */}
        <View style={styles.headerIconContainer}>
          <View style={styles.hourglassIconWrapper}>
            <View style={styles.hourglassLayer1} />
            <View style={styles.hourglassLayer2} />
            <View style={styles.hourglassLayer3} />
          </View>
        </View>

        {/* Paket Info */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Nama : {speed}</Text>
          <Text style={styles.cardText}>Paket : {price}</Text>
          <Text style={styles.cardText}>Durasi : {duration}</Text>
          <Text style={styles.cardText}>Metode Pembayaran : {method}</Text>
          <Text style={styles.cardText}>Biaya admin : 2000</Text>
        </View>

        {/* Kode VA */}
        <Text style={styles.sectionTitle}>Kode VA</Text>
        <View style={styles.transferBox}>
          <Text selectable style={styles.transferText}>
            8889976992682399
          </Text>
          <TouchableOpacity
            onPress={() => copyToClipboard("8889976992682399")}
            style={styles.copyButton}
          >
            <Icon name="copy" size={16} color="#007FFF" />
            <Text style={styles.copyText}>salin</Text>
          </TouchableOpacity>
        </View>

        {/* Toggle BCA */}
        <TouchableOpacity
          onPress={() => setShowBCAInstructions(!showBCAInstructions)}
          style={styles.toggleHeader}
        >
          <Text style={styles.instructionTitle}>
            Cara pembayaran via BCA Virtual Account
          </Text>
          <Icon
            name={showBCAInstructions ? "chevron-up" : "chevron-down"}
            size={20}
            color="#007FFF"
          />
        </TouchableOpacity>
        {showBCAInstructions && (
          <>
            <InstructionCard instructions={instructionsBCA1} />
            <InstructionCard instructions={instructionsBCA2} />
          </>
        )}

        {/* Toggle BRI */}
        <TouchableOpacity
          onPress={() => setShowBRIInstructions(!showBRIInstructions)}
          style={styles.toggleHeader}
        >
          <Text style={styles.instructionTitle}>
            Cara pembayaran via BRI Virtual Account
          </Text>
          <Icon
            name={showBRIInstructions ? "chevron-up" : "chevron-down"}
            size={20}
            color="#007FFF"
          />
        </TouchableOpacity>
        {showBRIInstructions && (
          <>
            <InstructionCard instructions={instructionsBRI1} />
            <InstructionCard instructions={instructionsBRI2} />
          </>
        )}

        {/* Tombol */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PaymentSuccess" as never)}
            style={styles.submitButton}
          >
            <Text style={styles.submitText}>Riwayat Pembayaran</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 20 },
  headerIconContainer: { alignItems: "center", marginBottom: 20 },
  hourglassIconWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  hourglassLayer1: {
    position: "absolute",
    width: 96,
    height: 96,
    backgroundColor: "#3B88C3",
    transform: [{ rotate: "2deg" }],
    borderRadius: 8,
  },
  hourglassLayer2: {
    position: "absolute",
    width: 80,
    height: 80,
    backgroundColor: "#ECB43C",
    transform: [{ rotate: "-1deg" }],
    borderRadius: 8,
  },
  hourglassLayer3: {
    position: "absolute",
    width: 64,
    height: 64,
    backgroundColor: "#FFAC33",
    transform: [{ rotate: "1deg" }],
    borderRadius: 8,
  },
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
