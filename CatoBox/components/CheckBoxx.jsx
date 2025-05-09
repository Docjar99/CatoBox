import  CheckBox  from "react-native-check-box";
import { React, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
export function CheckBoxx(){
    const [isChecked,setIsChecked] = useState(false);
    return(
        <CheckBox
            style={{flex: 1, marginBottom:30}}
            onClick={()=>
                setIsChecked(!isChecked)
            }
            isChecked={isChecked}
            
        />
    );
}
