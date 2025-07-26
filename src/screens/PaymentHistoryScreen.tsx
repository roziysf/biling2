import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNavigation from "../components/BottomNavigation";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

interface Tagihan {
  id_tagihan: string;
  bulan: string;
  tahun: string;
  tagihan: string;
  status: string;
  tgl_bayar: string;
  nama_paket: string;
  tarif: string;
  invoice: string; // pastikan field ini ada dari API
}

export default function PaymentHistoryScreen() {
  const [user, setUser] = useState<any>(null);
  const [riwayat, setRiwayat] = useState<Tagihan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRiwayat = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const parsed = JSON.parse(userData);
      setUser(parsed.pelanggan);

      try {
        const response = await fetch(
          `http://192.168.43.233/pkn_ldpp/Api/riwayat.php?id_pelanggan=${parsed.pelanggan.id_pelanggan}`
        );
        const result = await response.json();
        if (result.status === "success") {
          setRiwayat(result.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data riwayat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.userIcon}>
            <Icon name="user" size={20} color="#FFF" />
          </View>
          <Text style={styles.userName}>{user ? user.nama : "Memuat..."}</Text>
        </View>
        <Text style={styles.headerTitle}>RIWAYAT PEMBAYARAN</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color="#007FFF"
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {riwayat.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Tidak ada riwayat tagihan.
            </Text>
          ) : (
            riwayat.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  navigation.navigate(
                    "PaymentDetails2" as never,
                    { reference: item.invoice } as never
                  )
                }
              >
                <Text style={styles.text}>
                  <Text style={styles.label}>Periode</Text>: {item.bulan}/
                  {item.tahun}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Paket</Text>: {item.nama_paket}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Jumlah</Text>: Rp.{" "}
                  {parseInt(item.tagihan).toLocaleString("id-ID")}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Status</Text>:{" "}
                  {item.status === "LS" ? "Lunas" : "Belum Lunas"}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Tanggal Bayar</Text>:{" "}
                  {item.tgl_bayar === null ? "-" : item.tgl_bayar}
                </Text>
              </TouchableOpacity>
            ))
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
      )}

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: "#007FFF",
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  userIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  userName: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: "#FFF",
    borderColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
});
