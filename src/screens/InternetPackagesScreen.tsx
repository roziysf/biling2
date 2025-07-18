import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PackageCard from "../components/PackageCard";
import BottomNavigation from "../components/BottomNavigation";

const { width } = Dimensions.get("window");

interface Paket {
  id_paket: string;
  paket: string;
  tarif: string;
}

export default function InternetPackagesScreen() {
  const navigation = useNavigation();
  const [paketData, setPaketData] = useState<Paket[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Ambil data user dari AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, []);

  // Ambil data paket dari API
  useEffect(() => {
    fetch("http://192.168.43.233/pkn_ldpp/Api/paket.php")
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setPaketData(result.data);
        }
      })
      .catch((err) => console.error("Fetch paket error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => navigation.navigate("Profile" as never)}
          >
            <View style={styles.profileIcon}>
              <Feather name="user" size={24} color="#007FFF" />
            </View>
            <Text style={styles.profileName}>
              {user ? user.pelanggan.nama : "Memuat..."}
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>DAFTAR PAKET{"\n"}INTERNET</Text>
          {user && (
            <Text style={styles.activePackage}>
              Paket aktif: {user.paket.paket} ({parseInt(user.paket.tarif).toLocaleString("id-ID")})
            </Text>
          )}
        </View>
      </View>

      {/* Content */}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Info :</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoDetail}>
                Buruan aktifkan paket anda sebelum kehabisan.
              </Text>
              <Text style={styles.infoDetail}>
                Pastikan pembayaran dilakukan sebelum masa tenggat untuk
                mempercepat koneksi internet.
              </Text>
            </View>
          </View>

          <View style={styles.statusCard}>
  <View style={styles.statusRow}>
    <View>
      {user?.paket ? (
        <>
          <Text style={styles.statusTitle}>
            Kamu sudah berlangganan paket:
          </Text>
          <Text style={styles.statusSubtitle}>
            {user.paket.paket} - Rp.{parseInt(user.paket.tarif).toLocaleString("id-ID")}
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.statusTitle}>
            Kamu belum punya internet nih
          </Text>
          <Text style={styles.statusSubtitle}>
            Beli paket favorit anda di bawah ini !!
          </Text>
        </>
      )}
    </View>
    <Text style={styles.emoji}>📡</Text>
  </View>
</View>


          <Text style={styles.sectionTitle}>Spesial untuk anda</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#007FFF" />
          ) : (
            <View style={styles.grid}>
              {paketData.map((item) => (
                <PackageCard
                  key={item.id_paket}
                  speed={item.paket}
                  price={`Rp.${parseInt(item.tarif).toLocaleString("id-ID")}`}
                  duration="30 hari"
                />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    backgroundColor: "#007FFF",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 32,
  },
  profileContainer: { paddingTop: 48, paddingHorizontal: 16 },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  profileName: { color: "#FFF", fontWeight: "600", fontSize: 14 },
  headerTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 30,
  },
  activePackage: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
  },
  content: { padding: 20, paddingBottom: 100 },
  infoCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  infoText: {
    marginRight: 16,
    fontSize: 12,
    color: "#000",
    fontWeight: "500",
  },
  infoDetail: { fontSize: 12, color: "#000", marginBottom: 4 },
  statusCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  statusSubtitle: { fontSize: 12, fontWeight: "bold", color: "#000" },
  emoji: { fontSize: 20 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
