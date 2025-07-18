import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {
  speed: string;
  price: string;
  duration: string;
}

const { width } = Dimensions.get("window");

export default function PackageCard({ speed, price, duration }: Props) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{speed}</Text>
      <Text style={styles.text}>{price}</Text>
      <Text style={styles.text}>{duration}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
  onPress={() =>
    navigation.navigate("PaymentMetods", {
      speed,
      price,
      duration,
    })
  }
  style={styles.button}
>
  <Text style={styles.buttonText}>Aktifkan</Text>
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: (width - 60) / 2,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  text: {
    fontSize: 12,
    color: "#000",
    marginBottom: 4,
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#007FFF",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 12,
  },
});
