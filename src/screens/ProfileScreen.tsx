import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileFromAPI = async () => {
      try {
        const userStr = await AsyncStorage.getItem("user");
        if (!userStr) throw new Error("Data login tidak ditemukan");

        console.log(userStr)
        const user = JSON.parse(userStr);
        const id = user?.pelanggan.id_pelanggan;
        const no_hp = user?.pelanggan.no_hp;
        console.log(id)

        const url = `https://rozi.isnupasuruan.or.id/Api/Profile.php?id_pelanggan=${id}&no_hp=${no_hp}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
        if (result.status === "success") {
          setProfile(result.data);
        }
      } catch (err) {
        console.error("Gagal memuat profil:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileFromAPI();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "#FFF" }}>Gagal memuat data profil</Text>
      </View>
    );
  }

  const { pelanggan, paket } = profile;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.card}>
          {/* Profile Image */}
          <View style={styles.imageContainer}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Feather name="user" size={64} color="#000" />
              </View>
            </View>
          </View>

          {/* Profile Details */}
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Nama</Text>
              <Text style={styles.value}>{pelanggan.nama}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.label}>Alamat</Text>
              <Text style={styles.value}>{pelanggan.alamat}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.label}>No. HP</Text>
              <Text style={styles.value}>{pelanggan.no_hp}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.label}>Paket</Text>
              <Text style={styles.value}>
                {paket
                  ? `${paket.paket} - Rp. ${parseInt(paket.tarif).toLocaleString("id-ID")}`
                  : "Belum ada paket"}
              </Text>
            </View>


            <View style={styles.detailItem}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>Aktif</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
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
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#007FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFF",
    borderColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 24,
    width: width * 0.9,
    maxWidth: 373,
    alignItems: "center",
    marginTop: 80,
  },
  imageContainer: {
    position: "absolute",
    top: -64,
    alignSelf: "center",
  },
  outerCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#007FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    paddingTop: 80,
    width: "100%",
  },
  detailItem: {
    alignItems: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.6)",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
