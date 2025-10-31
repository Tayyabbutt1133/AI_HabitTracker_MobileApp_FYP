import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AISuggestions from "./AISuggestions";
import AddHabitBtn from "../components/AddHabit-btn";
import AllHabitsBtn from "../components/AllHabits-btn";

export default function Dashboard() {
  const router = useRouter();

  // Logout handler
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId"); // delete stored user id
      router.push("/pages/login"); // navigate back to login
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <LinearGradient
          colors={["#4F46E5", "#6366F1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-12 pb-8 rounded-b-3xl shadow-sm"
        >
          <Text className="text-2xl font-bold text-white">
            Welcome Back 👋
          </Text>
          <Text className="text-white mt-2 text-base">
            Stay consistent. Small steps build big habits.
          </Text>
        </LinearGradient>

        {/* Content */}
        <View className="px-6 mt-6">
          <View className="bg-white p-6 rounded-2xl shadow-md">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Habits Ecosystem
            </Text>

            {/* Buttons Row */}
            <View className="flex-row justify-between">
              {/* All Habits Button */}
              <AllHabitsBtn />

              {/* Add Habit Button */}
              <AddHabitBtn />
            </View>
          </View>


          {/* AI Suggestions */}
          <AISuggestions />

          {/* Progress */}
          <Link href="/pages/Progress" asChild>
            <TouchableOpacity className="bg-white p-6 mt-4 rounded-2xl shadow-md active:opacity-90">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-lg font-semibold text-gray-800">
                    Your Progress
                  </Text>
                  <Text className="text-gray-600 mt-1">🔥 Streak: 7 days</Text>
                  <Text className="text-gray-600">✅ Completion: 80%</Text>
                </View>
                <Feather name="bar-chart-2" size={28} color="#4F46E5" />
              </View>
            </TouchableOpacity>
          </Link>

          {/* Rewards */}
          <View className="bg-white p-6 mt-4 rounded-2xl shadow-md">
            <View className="flex-row items-center mb-3">
              <Feather name="award" size={20} color="#10B981" />
              <Text className="ml-2 text-lg font-semibold text-gray-800">
                Rewards
              </Text>
            </View>
            <Text className="text-gray-600">🏅 Badges: 2</Text>
            <Text className="text-gray-600">⭐ Points: 450</Text>
          </View>



          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 w-fit p-4 mt-6 rounded-2xl shadow-md active:opacity-90"
          >
            <Text className="text-black text-center font-semibold">Logout</Text>
          </TouchableOpacity>



        </View>
      </ScrollView>
    </View>
  );
}
