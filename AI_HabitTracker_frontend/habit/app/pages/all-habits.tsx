import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Habits from "../components/Habits";



type Habit = {
  id: number;
  habit_name: string;
  description: string;
  frequency: string;
  askAI: string;
  AIsuggestions: string;
  userId: number;
};

const AllHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          Alert.alert("Error", "No user found. Please login again.");
          return;
        }

        const response = await fetch(`http://localhost:3000/api/user-habit/${userId}`);
        const data = await response.json();

        if (response.ok && data.habits) {
          setHabits(data.habits);
        } else {
          Alert.alert("No Habits", "No habits found for this user.");
        }
      } catch (error) {
        console.error("Error fetching habits:", error);
        Alert.alert("Error", "Failed to fetch habits. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const updateHabitStatus = (id: number, newStatus: "done" | "pending" | "missed") => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, status: newStatus } : habit
      )
    );
    setSelectedHabit(null);
  };

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "done":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "missed":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "done":
        return "check-circle";
      case "pending":
        return "clock";
      case "missed":
        return "x-circle";
      default:
        return "circle";
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-3 text-gray-700">Loading habits...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 px-6 pt-8">

      <Text className="text-2xl font-bold text-gray-800 mb-4">All Habits</Text>
      <Text className="text-gray-600 mb-6">
        You have {habits.length} habit(s)
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4 mt-2">
        {habits.map((habit, index) => (
          <Habits habit={habit} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AllHabits;
