import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';

export function PickerR(){
  const [selectedCareer, setSelectedCareer] = useState('');

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCareer}
        onValueChange={(itemValue, itemIndex) => setSelectedCareer(itemValue)}
        style={styles.listContainer}
      >
        <Picker.Item label="Selecciona tu carrera" value="" enabled={false} />
        <Picker.Item label="Administración de Empresas" value="Administración de Empresas" />
        <Picker.Item label="Arquitectura" value="Arquitectura" />
        <Picker.Item label="Ciencia Política y Gobierno" value="Ciencia Política y Gobierno" />
        <Picker.Item label="Comunicación Social" value="Comunicación Social" />
        <Picker.Item label="Contabilidad" value="Contabilidad" />
        <Picker.Item label="Derecho" value="Derecho" />
        <Picker.Item label="Educación Inicial" value="Educación Inicial" />
        <Picker.Item label="Educación Primaria" value="Educación Primaria" />
        <Picker.Item label="Educación Secundaria" value="Educación Secundaria" />
        <Picker.Item label="Enfermería" value="Enfermería" />
        <Picker.Item label="Farmacia y Bioquímica" value="Farmacia y Bioquímica" />
        <Picker.Item label="Ingeniería Agronómica y Agrícola" value="Ingeniería Agronómica y Agrícola" />
        <Picker.Item label="Ingeniería Ambiental" value="Ingeniería Ambiental" />
        <Picker.Item label="Ingeniería Biotecnológica" value="Ingeniería Biotecnológica" />
        <Picker.Item label="Ingeniería Civil" value="Ingeniería Civil" />
        <Picker.Item label="Ingeniería Comercial" value="Ingeniería Comercial" />
        <Picker.Item label="Ingeniería de Industria Alimentaria" value="Ingeniería de Industria Alimentaria" />
        <Picker.Item label="Ingeniería de Minas" value="Ingeniería de Minas" />
        <Picker.Item label="Ingeniería de Sistemas" value="Ingeniería de Sistemas" />
        <Picker.Item label="Ingeniería Electrónica" value="Ingeniería Electrónica" />
        <Picker.Item label="Ingeniería Industrial" value="Ingeniería Industrial" />
        <Picker.Item label="Ingeniería Mecánica" value="Ingeniería Mecánica" />
        <Picker.Item label="Ingeniería Mecánica Eléctrica" value="Ingeniería Mecánica Eléctrica" />
        <Picker.Item label="Ingeniería Mecatrónica" value="Ingeniería Mecatrónica" />
        <Picker.Item label="Medicina Humana" value="Medicina Humana" />
        <Picker.Item label="Medicina Veterinaria y Zootecnia" value="Medicina Veterinaria y Zootecnia" />
        <Picker.Item label="Obstetricia y Puericultura" value="Obstetricia y Puericultura" />
        <Picker.Item label="Odontología" value="Odontología" />
        <Picker.Item label="Psicología" value="Psicología" />
        <Picker.Item label="Publicidad y Multimedia" value="Publicidad y Multimedia" />
        <Picker.Item label="Tecnología Médica" value="Tecnología Médica" />
        <Picker.Item label="Teología" value="Teología" />
        <Picker.Item label="Trabajo Social" value="Trabajo Social" />
        <Picker.Item label="Turismo y Hotelería" value="Turismo y Hotelería" />
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
    height: 50,
    width: '100%',
  },
});

