import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface ChatItem {
  type: "user" | "bot" | "options";
  message?: string;
  options?: string[];
}

export default function AdminScreen() {
  const [chatLog, setChatLog] = useState<ChatItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [initialOptionsShown, setInitialOptionsShown] = useState(false);

  const handleUserMessage = (message: string) => {
    setChatLog((prev) => [...prev, { type: "user", message }]);
    setIsTyping(true);

    setTimeout(() => {
      const { response, followUp } = getBotResponse(message);
      const updated: ChatItem[] = [
        { type: "bot", message: `🤖 ${response}` },
      ];
      if (followUp && followUp.length > 0) {
        updated.push({ type: "options", options: followUp });
      }
      setChatLog((prev) => [...prev, ...updated]);
      setIsTyping(false);
    }, 1200);
  };

  const getBotResponse = (
    message: string
  ): { response: string; followUp?: string[] } => {
    const msg = message.toLowerCase();

    if (msg.includes("beli") || msg.includes("paket")) {
      return {
        response:
          "Untuk membeli paket, masuk ke halaman 'Daftar Paket', pilih paket yang kamu inginkan, lalu lanjutkan ke pembayaran.",
        followUp: ["Cara bayar", "Cek kuota", "Status pembayaran"],
      };
    }

    if (msg.includes("bayar")) {
      return {
        response:
          "Berikut langkah-langkah cara bayar:\n1. Pilih paket terlebih dahulu\n2. Pilih metode pembayaran (VA atau e-wallet)\n3. Lakukan pembayaran sesuai instruksi\n4. Tunggu hingga status aktif muncul.",
        followUp: ["Status pembayaran", "VA bisa berubah?"],
      };
    }

    if (msg.includes("kuota") || msg.includes("masa aktif")) {
      return {
        response:
          "Kamu bisa cek di menu Home lalu ke 'Daftar Paket'. Di sana ada keterangan paket aktif dan masa aktifnya.\nKalau belum ada paket, yuk checkout sekalian!",
        followUp: ["Cara beli paket", "Metode pembayaran", "Hubungi admin"],
      };
    }

    if (msg.includes("status pembayaran")) {
      return {
        response:
          "Lihat status pembayaran di menu 'Riwayat Pembayaran'. Pastikan kamu sudah membayar, atau hapus jika batal membeli.",
        followUp: ["Cek kuota", "Cara beli paket"],
      };
    }

    if (
      msg.includes("tidak bisa konek") ||
      msg.includes("tidak koneksi") ||
      msg.includes("tidak bisa internet")
    ) {
      return {
        response:
          "Coba restart modem/router kamu terlebih dahulu. Pastikan juga kuota kamu masih tersedia dan tidak melewati masa aktif.",
        followUp: ["Cek kuota", "Hubungi admin"],
      };
    }

    if (msg.includes("admin")) {
      return {
        response:
          "Silakan hubungi admin kami via WhatsApp:\n[Klik untuk WhatsApp](https://wa.me/6287755224249)",
        followUp: ["Masalah teknis lainnya", "Kembali ke menu utama"],
      };
    }

    if (msg.includes("masalah teknis")) {
      return {
        response: "Masalah teknis apa yang kamu alami? Pilih salah satu:",
        followUp: ["Tidak bisa konek", "Cek kuota", "Status pembayaran"],
      };
    }

    if (msg.includes("va")) {
      return {
        response:
          "Nomor Virtual Account bisa berbeda untuk setiap transaksi. Gunakan nomor terbaru dari checkout.",
        followUp: ["Cara bayar", "Hubungi admin"],
      };
    }

    return {
      response:
        "Maaf, saya belum mengerti pertanyaan itu. Coba pilih pertanyaan lain ya.",
      followUp: [
        "Bagaimana cara beli paket?",
        "Cek kuota",
        "Saya tidak bisa konek internet",
      ],
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Icon name="cpu" size={20} /> Bot Admin
      </Text>

      <ScrollView
        style={styles.chatBox}
        onContentSizeChange={() => {
          if (!initialOptionsShown) {
            setChatLog((prev) => [
              ...prev,
              {
                type: "options",
                options: [
                  "Bagaimana cara beli paket?",
                  "Cek kuota",
                  "Saya tidak bisa konek internet",
                ],
              },
            ]);
            setInitialOptionsShown(true);
          }
        }}
      >
        {chatLog.map((item, index) => {
          if (item.type === "options" && item.options) {
            return (
              <View key={index} style={styles.optionWrap}>
                <Text style={styles.optionTitle}>🔽 Pilih pertanyaan:</Text>
                <View style={styles.optionList}>
                  {item.options.map((opt, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.optionButton}
                      onPress={() => handleUserMessage(opt)}
                    >
                      <Text style={styles.optionText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          }

          const isLink =
            item.type === "bot" && item.message?.includes("https://wa.me");
          const parts = item.message?.split(
            /(\[Klik untuk WhatsApp\]\(.*?\))/
          ) || [];

          return (
            <View
              key={index}
              style={[
                styles.chatBubble,
                item.type === "user" ? styles.userBubble : styles.botBubble,
              ]}
            >
              {isLink
                ? parts.map((part, idx) => {
                    if (part.startsWith("[Klik untuk WhatsApp]")) {
                      const url = part.match(/\((.*?)\)/)?.[1];
                      return (
                        <Text
                          key={idx}
                          style={[styles.chatText, styles.linkText]}
                          onPress={() => url && Linking.openURL(url)}
                        >
                          Klik untuk WhatsApp
                        </Text>
                      );
                    }
                    return (
                      <Text key={idx} style={styles.chatText}>
                        {part}
                      </Text>
                    );
                  })
                : item.message && (
                    <Text style={styles.chatText}>{item.message}</Text>
                  )}
            </View>
          );
        })}

        {isTyping && (
          <View style={[styles.chatBubble, styles.botBubble]}>
            <Text style={styles.chatText}>🤖 Bot sedang mengetik...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6", padding: 16, paddingTop: 40 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  chatBox: { flex: 1, marginBottom: 12 },
  chatBubble: {
    padding: 12,
    marginVertical: 4,
    maxWidth: "80%",
    borderRadius: 12,
  },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#007FFF" },
  botBubble: { alignSelf: "flex-start", backgroundColor: "#E5E7EB" },
  chatText: { color: "#000", fontSize: 14 },
  linkText: { color: "#007AFF", textDecorationLine: "underline" },
  optionWrap: { marginVertical: 10 },
  optionTitle: { fontWeight: "600", marginBottom: 6 },
  optionList: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  optionButton: {
    backgroundColor: "#007FFF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: { color: "#FFF", fontSize: 12 },
});
