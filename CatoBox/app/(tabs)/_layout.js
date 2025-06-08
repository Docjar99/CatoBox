import { Platform, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeIcon, CircleInfoIcon, ForoIcon, ConfigIcon, UserIcon } from "../../components/Icons";

export default function TabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#00bc70", // Verde activo
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    paddingBottom: insets.bottom || 8,
                    paddingTop: 6,
                    height: 60 + (insets.bottom || 8),
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: "500",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                }}
            />
            <Tabs.Screen
                name="foro"
                options={{
                    title: "Foro",
                    tabBarIcon: ({ color }) => <ForoIcon color={color} />,
                }}
            />
            <Tabs.Screen
            name="userinfo"
            options={{
                title: "Perfil",
                tabBarIcon: ({ color }) => <UserIcon color={color} />,
            }}
            />
        </Tabs>
    );
}
