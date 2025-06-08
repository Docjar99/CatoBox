import { View, Text, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function PreguntaFila({ pregunta }) {
  return (
    <View style={styles.fila}>
      <Link href={`/pregunta/${pregunta.id}`} asChild>
        <Text style={[styles.columna, styles.colTitulo]} numberOfLines={1}>
          {pregunta.titulo}
        </Text>
      </Link>

      <Link href={`/user/${pregunta.autor_id}`} asChild>
        <Text style={[styles.columna, styles.colAutor]}>
          {pregunta.autor}
        </Text>
      </Link>
      
      <Text style={[styles.columna, styles.colFecha]}>
        {pregunta.fecha}
      </Text>
    </View>
  );
}
