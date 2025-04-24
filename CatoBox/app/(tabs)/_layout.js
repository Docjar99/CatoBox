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
                tabBarStyle: {
                    // Handle platform-specific tab bar height and padding
                    height: Platform.OS === 'web' ? 65 : 80,
                    paddingTop: 8,
                    // Use different padding based on platform and safe area insets
                    paddingBottom: Platform.OS === 'web' 
                        ? 15 
                        : Math.max(20, insets.bottom),
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#e5e5e5',
                    position: 'absolute',
                    // Web-specific styles to ensure tab bar sticks to bottom
                    ...(Platform.OS === 'web' && {
                        bottom: 0,
                        left: 0,
                        right: 0,
                        position: 'fixed',
                        zIndex: 999,
                    }),
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                    paddingBottom: Platform.OS === 'web' ? 8 : 5,
                    paddingTop: 3,
                },
                tabBarIconStyle: {
                    marginBottom: Platform.OS === 'web' ? 0 : -4,
                },
                tabBarItemStyle: {
                    paddingVertical: 8,
                }
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
