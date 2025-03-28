import { Tabs } from "expo-router";
import { View } from "react-native";
import { HomeIcon, CircleInfoIcon } from "../../components/Icons";
export default function TabsLayout(){
    return <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "lightgreen",
        }}
        >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                tabBarIcon:({color}) => <HomeIcon color = {color}/>,
            }
            }
        />
        <Tabs.Screen
            name="foro"
            options={{
                title: "Foro",
                tabBarIcon:({color}) => <CircleInfoIcon color = {color}/>,

            }
            }
        />

        


    </Tabs>;
}