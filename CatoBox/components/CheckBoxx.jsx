import CheckBox from "react-native-check-box";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

export function CheckBoxx() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <CheckBox
        isChecked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        checkBoxColor="#00bc70"
      />
      <Text style={styles.text}>
        Acepto el compromiso ético de la plataforma
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4,
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
});
