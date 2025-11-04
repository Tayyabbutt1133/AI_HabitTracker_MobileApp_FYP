import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#4F46E5",
                tabBarInactiveTintColor: "gray",
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "ellipse-outline";

                    if (route.name === "dashboard") iconName = "home-outline";
                    else if (route.name === "progress") iconName = "bar-chart-outline";
                    else if (route.name === "settings") iconName = "person-outline";

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
            <Tabs.Screen name="progress" options={{ title: "Progress" }} />
            <Tabs.Screen name="settings" options={{ title: "Settings" }} />
        </Tabs>
    );
}
