import react from "react";
import { View, Text } from "react-native";

export function Screen({ children }) {
    return <View
    className="flex-1"
    >
        {children}</View>;
}