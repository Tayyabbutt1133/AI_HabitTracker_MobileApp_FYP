import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    Switch,
} from "react-native";
import {
    User,
    Bell,
    Lock,
    Moon,
    Globe,
    HelpCircle,
    Info,
    LogOut,
    ChevronRight,
    Edit2,
    Sun,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Settings() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [userName] = useState("John Doe");
    const [userEmail] = useState("john@example.com");
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("userId");
            router.push("/pages/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const handleEditProfile = () => {
        Alert.alert("Edit Profile", "Navigate to profile editor");
    };

    const SettingItem = ({ icon: Icon, title, subtitle, onPress, rightElement }: any) => (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-200`}
            activeOpacity={0.7}
        >
            <View className="flex-row items-center flex-1">
                <Icon size={22} color="#3B82F6" style={{ marginRight: 16 }} />
                <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-900">{title}</Text>
                    {subtitle && <Text className="text-xs text-gray-500 mt-1">{subtitle}</Text>}
                </View>
            </View>
            {rightElement}
        </TouchableOpacity>
    );

    return (
        <View className={`flex-1 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Header */}
                <View
                    className={`px-4 py-4 border-b ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                        }`}
                >
                    <Text
                        className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Settings
                    </Text>
                </View>

                {/* Profile Section */}
                <View
                    className={`px-4 py-6 border-b ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                        }`}
                >
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                            <View className="w-16 h-16 rounded-full bg-blue-500 items-center justify-center">
                                <User size={32} color="white" />
                            </View>
                            <View className="ml-4 flex-1">
                                <Text
                                    className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"
                                        }`}
                                >
                                    {userName}
                                </Text>
                                <Text
                                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                                        } mt-1`}
                                >
                                    {userEmail}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={handleEditProfile}
                            className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-blue-50"
                                }`}
                        >
                            <Edit2 size={18} color="#3B82F6" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Account Section */}
                <View className="mt-6">
                    <Text
                        className={`text-xs font-bold uppercase px-4 py-2 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Account
                    </Text>
                    <View className={darkMode ? "bg-gray-800" : "bg-white"}>
                        <SettingItem
                            icon={Lock}
                            title="Change Password"
                            subtitle="Update your security password"
                            onPress={() => Alert.alert("Change Password")}
                            rightElement={<ChevronRight size={20} color="#9CA3AF" />}
                        />
                        <SettingItem
                            icon={Globe}
                            title="Language"
                            subtitle="English (US)"
                            onPress={() => Alert.alert("Change Language")}
                            rightElement={<ChevronRight size={20} color="#9CA3AF" />}
                        />
                    </View>
                </View>

                {/* Preferences Section */}
                <View className="mt-6">
                    <Text
                        className={`text-xs font-bold uppercase px-4 py-2 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Preferences
                    </Text>
                    <View className={darkMode ? "bg-gray-800" : "bg-white"}>
                        {/* Notifications */}
                        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
                            <View className="flex-row items-center flex-1">
                                <Bell size={22} color="#3B82F6" style={{ marginRight: 16 }} />
                                <View>
                                    <Text
                                        className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"
                                            }`}
                                    >
                                        Notifications
                                    </Text>
                                    <Text
                                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                                            } mt-1`}
                                    >
                                        Manage app notifications
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={notifications}
                                onValueChange={setNotifications}
                                thumbColor="#fff"
                                trackColor={{ true: "#3B82F6", false: "#D1D5DB" }}
                            />
                        </View>

                        {/* Dark Mode */}
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <View className="flex-row items-center flex-1">
                                {darkMode ? (
                                    <Moon size={22} color="#3B82F6" style={{ marginRight: 16 }} />
                                ) : (
                                    <Sun size={22} color="#3B82F6" style={{ marginRight: 16 }} />
                                )}
                                <View>
                                    <Text
                                        className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"
                                            }`}
                                    >
                                        Dark Mode
                                    </Text>
                                    <Text
                                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                                            } mt-1`}
                                    >
                                        {darkMode ? "Enabled" : "Disabled"}
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                thumbColor="#fff"
                                trackColor={{ true: "#3B82F6", false: "#D1D5DB" }}
                            />
                        </View>
                    </View>
                </View>

                {/* Support Section */}
                <View className="mt-6">
                    <Text
                        className={`text-xs font-bold uppercase px-4 py-2 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Support
                    </Text>
                    <View className={darkMode ? "bg-gray-800" : "bg-white"}>
                        <SettingItem
                            icon={HelpCircle}
                            title="Help & Support"
                            subtitle="Get help and contact support"
                            onPress={() => Alert.alert("Opening Help Center")}
                            rightElement={<ChevronRight size={20} color="#9CA3AF" />}
                        />
                        <SettingItem
                            icon={Info}
                            title="About App"
                            subtitle="Version 1.0.0"
                            onPress={() => Alert.alert("About App")}
                            rightElement={<ChevronRight size={20} color="#9CA3AF" />}
                        />
                    </View>
                </View>

                {/* Logout Button */}
                <View className="mt-6 mb-8 px-4">
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="w-full py-3 bg-red-50 border border-red-200 rounded-lg flex-row items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <LogOut size={20} color="#DC2626" style={{ marginRight: 8 }} />
                        <Text className="text-base font-semibold text-red-600">Logout</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View
                    className={`px-4 py-4 border-t ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                        }`}
                >
                    <Text
                        className={`text-xs text-center ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        © 2025 Your App. All rights reserved.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}