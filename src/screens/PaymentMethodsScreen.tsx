import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

type PaymentMethod = {
  code: string;
  name: string;
  group: string;
  icon_url: string;
};

export default function PaymentMethodsScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();

  const { speed, price, duration } = route.params;

  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://192.168.43.233/pkn_ldpp/Api/metods.php")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setMethods(json.data);
        }
      })
      .catch((err) => console.error("Error fetching methods:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleMethodSelect = (methodCode: string) => {
    setSelectedMethod(methodCode);
  };

  const renderMethods = (groupName: string) => {
    return methods
      .filter((m) => m.group === groupName)
      .map((m) => (
        <PaymentOption
          key={m.code}
          name={m.name}
          iconUrl={m.icon_url}
          selected={selectedMethod === m.code}
          onPress={() => handleMethodSelect(m.code)}
        />
      ));
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#007FFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      {/* Icon Atas */}
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

        {/* Virtual Account */}
        {renderMethods("Virtual Account").length > 0 && (
          <>
            <Text style={styles.methodTitle}>Virtual Account</Text>
            {renderMethods("Virtual Account")}
          </>
        )}

        {/* E-Wallet */}
        {renderMethods("E-Wallet").length > 0 && (
          <>
            <Text style={styles.methodTitle}>E-Wallet</Text>
            {renderMethods("E-Wallet")}
          </>
        )}

        {/* QRIS */}
        {renderMethods("QRIS").length > 0 && (
          <>
            <Text style={styles.methodTitle}>QRIS</Text>
            {renderMethods("QRIS")}
          </>
        )}
      </View>

      {/* Tombol Bayar */}
      <TouchableOpacity
        style={[
          styles.payButton,
          { backgroundColor: selectedMethod ? "#007FFF" : "#9CA3AF" },
        ]}
        disabled={!selectedMethod}
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
  iconUrl,
  selected,
  onPress,
}: {
  name: string;
  iconUrl: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.option}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: iconUrl }} style={{ width: 50, height: 15, marginRight: 15 }} />
        <Text style={styles.optionText}>{name}</Text>
      </View>
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
