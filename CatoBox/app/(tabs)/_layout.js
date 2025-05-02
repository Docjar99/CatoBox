import { Platform, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeIcon, CircleInfoIcon, ForoIcon, ConfigIcon } from "../../components/Icons";

export default function TabsLayout() {
    // Get safe area insets to handle notches and home indicators
    const insets = useSafeAreaInsets();
    
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "lightgreen",
                tabBarInactiveTintColor: "gray",
                

            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color}) => <HomeIcon color={color} />,
                }}
            />
            <Tabs.Screen
                name="foro"
                options={{
                    title: "Foro",
                    tabBarIcon: ({color}) => <ForoIcon color={color} />,
                }}
            />

            <Tabs.Screen
                name="userinfo"
                options={{
                    title: "Configuración",
                    tabBarIcon: ({color}) => <ConfigIcon color={color} />,
                }}
            />

        </Tabs>
    );
}
