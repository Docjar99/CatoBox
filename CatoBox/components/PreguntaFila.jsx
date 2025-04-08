import { View, Text, StyleSheet } from "react-native";
import { Link } from 'expo-router';
export default function PreguntaFila({ pregunta }) {
  return (
    <View style={styles.fila}>

        <Link href="/pregunta"> {/*Link a la pregunta*/}
            <Text style={[styles.columna, styles.colTitulo]} numberOfLines={1}>
                {pregunta.titulo}
            </Text>
        </Link>



      <Link href="/user"> {/*Link al perfil del user*/}
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

const styles = StyleSheet.create({
  fila: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  columna: {
    fontSize: 14,
    color: "#333",
    
  },
  colTitulo: {
    flex: 2,
  },
  colAutor: {
    flex: 1.2,
    textAlign:'right',
  },
  colFecha: {
    flex: 1,
    textAlign: "right",
  },
});
