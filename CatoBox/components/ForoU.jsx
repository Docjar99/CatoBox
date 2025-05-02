import { Screen } from "./Screen";
import { Text, StyleSheet } from "react-native";
export function ForoU(){
    return(
        <Screen>
            <Text style={styles.txt}>Hola desde el foro popopo</Text>
        </Screen>
    );
}
const styles = StyleSheet.create({
    txt:{
        margin:10,
    }
})