import  CheckBox  from "react-native-check-box";
import { React, useState } from "react";
import { Text } from "react-native";
import { Link } from "expo-router";
import { StyleSheet } from "nativewind";
export function CheckBoxx(){
    const [isChecked,setIsChecked] = useState(false);
    return(
        <CheckBox
            style={{flex: 1, marginBottom:12}}
            onClick={()=>
                setIsChecked(!isChecked)
            }
            isChecked={isChecked}
            
            rightText={<Link href={""}><Text style={styles.link}>Aceptas los términos y condiciones</Text></Link>}
        />
    );
}
const styles =StyleSheet.create({
    link:{
        color:'blue',
        
    },
})