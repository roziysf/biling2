import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

type PaymentMethod = {
  id: string;
  name: string;
  category: "qris" | "ewallet" | "virtual";
};

export default function PaymentMethodsScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();

  // Ambil data dari halaman sebelumnya
  const { speed, price, duration } = route.params;

  const [selectedMethod, setSelectedMethod] = useState<string>("BCA");

  const qrisOptions: PaymentMethod[] = [
    { id: "QRIS", name: "QRIS", category: "qris" },
  ];

  const ewalletOptions: PaymentMethod[] = [
    { id: "DANA", name: "DANA", category: "ewallet" },
    { id: "OVO", name: "OVO", category: "ewallet" },
  ];

  const virtualAccountOptions: PaymentMethod[] = [
    { id: "BCA", name: "BCA", category: "virtual" },
    { id: "BRI", name: "BRI", category: "virtual" },
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Icon name="credit-card" size={32} color="#fff" />
          </View>
        </View>
      </View>

      {/* Paket Detail dari param */}
      <View style={styles.card}>
        <Text style={styles.detailText}>Speed : {speed}</Text>
        <Text style={styles.detailText}>Harga : {price}</Text>
        <Text style={styles.detailText}>Durasi : {duration}</Text>
      </View>

      {/* Metode Pembayaran */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Bayar Menggunakan</Text>

        {/* QRIS */}
        <Text style={styles.methodTitle}>QRIS</Text>
        {qrisOptions.map((opt) => (
          <PaymentOption
            key={opt.id}
            name={opt.name}
            selected={selectedMethod === opt.id}
            onPress={() => handleMethodSelect(opt.id)}
          />
        ))}

        {/* E-Wallet */}
        <Text style={styles.methodTitle}>E-Wallet</Text>
        {ewalletOptions.map((opt) => (
          <PaymentOption
            key={opt.id}
            name={opt.name}
            selected={selectedMethod === opt.id}
            onPress={() => handleMethodSelect(opt.id)}
          />
        ))}

        {/* Virtual Account */}
        <Text style={styles.methodTitle}>Virtual Accounts</Text>
        {virtualAccountOptions.map((opt) => (
          <PaymentOption
            key={opt.id}
            name={opt.name}
            selected={selectedMethod === opt.id}
            onPress={() => handleMethodSelect(opt.id)}
          />
        ))}
      </View>

      {/* Tombol Bayar */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={() =>
          navigation.navigate("PaymentDetails", {
            speed,
            price,
            duration,
            method: selectedMethod,
          })
        }
      >
        <Text style={styles.payButtonText}>Bayar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function PaymentOption({
  name,
  selected,
  onPress,
}: {
  name: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.option}>
      <Text style={styles.optionText}>{name}</Text>
      <View
        style={[
          styles.radio,
          selected ? styles.radioSelected : styles.radioUnselected,
        ]}
      />
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F3F4F6",
    flexGrow: 1,
  },
  headerIcon: {
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  outerCircle: {
    width: 147,
    height: 145,
    borderRadius: 80,
    backgroundColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#999",
  },
  detailText: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  methodTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
    marginTop: 12,
  },
  option: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#999",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  radio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#000",
  },
  radioSelected: {
    backgroundColor: "#415EF7",
  },
  radioUnselected: {
    backgroundColor: "#FFF",
  },
  payButton: {
    backgroundColor: "#007FFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
