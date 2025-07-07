import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function ImagenCompleta() {
  const { url } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: decodeURIComponent(url) }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 2,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
  },
  closeText: {
    fontSize: 18,
    color: "#000",
  },
});
