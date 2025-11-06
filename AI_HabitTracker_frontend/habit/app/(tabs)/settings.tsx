import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    Switch,
} from "react-native";
import { Lock, Moon, LogOut, Sun } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Settings() {
    const [darkMode, setDarkMode] = useState(false);
    const router = useRouter();

    const handleChangePassword = () => {
        router.push('/pages/reset-auth/change-password')
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("userId");
            router.push("/pages/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <View className={`flex-1 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Header */}
                <View className={`px-4 py-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                    <Text className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Settings
                    </Text>
                </View>
                {/* Change Password */}
                <TouchableOpacity
                    onPress={handleChangePassword}
                    className={`mx-4 mt-4 px-4 py-4 rounded-lg flex-row items-center ${darkMode ? "bg-gray-800" : "bg-white"}`}
                >
                    <Lock size={20} color="#3B82F6" style={{ marginRight: 12 }} />
                    <View className="flex-1">
                        <Text className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                            Change Password
                        </Text>
                    </View>
                    <Text className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>›</Text>
                </TouchableOpacity>

                {/* Dark Mode */}
                <View className={`mx-4 mt-4 px-4 py-4 rounded-lg flex-row items-center justify-between ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                    <View className="flex-row items-center flex-1">
                        {darkMode ? (
                            <Moon size={20} color="#3B82F6" style={{ marginRight: 12 }} />
                        ) : (
                            <Sun size={20} color="#3B82F6" style={{ marginRight: 12 }} />
                        )}
                        <Text className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                            Dark Mode
                        </Text>
                    </View>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        thumbColor="#fff"
                        trackColor={{ true: "#3B82F6", false: "#D1D5DB" }}
                    />
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    onPress={handleLogout}
                    className="mx-4 mt-8 py-3 bg-red-50 border border-red-200 rounded-lg flex-row items-center justify-center"
                >
                    <LogOut size={20} color="#DC2626" style={{ marginRight: 8 }} />
                    <Text className="text-base font-semibold text-red-600">Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}