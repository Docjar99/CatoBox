import {Text, TextInput, StyleSheet, View } from "react-native";
import { Screen } from "./Screen";
import {User} from "./User";
export function UserInfo(){
    return(
        <Screen>
            <View style={styles.container}>
                <View style={styles.foto}>
                    <User />
                </View>
                <View style={styles.info}>
                    <Text>Nombres: Wissin </Text>
                    <Text>Apellidos: Yandel</Text>
                    <Text>Carrera: Chistemas</Text>
                    <Text>Semestre: -1</Text>
                </View>

            </View>

        </Screen>
    );
}
const styles = StyleSheet.create ({
    container:{
        flex:1,
        padding:16,
        alignItems:'center',

    },
    foto:{
    },
    info:{
        textAlign:'center',
        alignItems:'center',
    },
})