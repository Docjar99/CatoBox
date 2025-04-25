import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';

export function PickerS(){
  const [semestre_carrera, setSemestre] = useState('');

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={semestre_carrera}
        onValueChange={(itemValue, itemIndex) => setSemestre(itemValue)}
        style={styles.listContainer}
      >
        <Picker.Item label="Selecciona tu semestre" value="" enabled={false} />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />

      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  listContainer: {
    height: 30,
    width: '100%',
  },
});

