import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AddHabit() {
  const [habit_name, sethabit_name] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("");
  const [askAI, setaskAI] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSaveHabit = async () => {
    if (!habit_name || !frequency) {
      Alert.alert("Validation Error", "Please enter habit name and frequency.");
      return;
    }

    setLoading(true);

    const Id = await AsyncStorage.getItem("userId");

    const payload = {
      habit_name,
      description,
      frequency,
      askAI,
      Id
    };

    try {
      const response = await fetch("http://localhost:3000/api/post-habit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        
        Alert.alert("Success", "Habit added successfully!");
        // clear inputs
        sethabit_name("");
        setDescription("");
        setFrequency("");
        setaskAI("");
        router.push('/pages/all-habits')
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };







  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        className="px-6 pt-12"
      >
        {/* Header */}
        <Text className="text-3xl font-extrabold text-gray-900 mb-2">
          Add New Habit
        </Text>
        <Text className="text-gray-600 text-base mb-8">
          Create a new habit and start tracking 🚀
        </Text>

        {/* Habit Name */}
        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">Habit Name</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800"
            placeholder="e.g. Morning Exercise"
            value={habit_name}
            onChangeText={sethabit_name}
          />
        </View>

        {/* Description */}
        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">Description</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800"
            placeholder="Short description (optional)"
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Frequency */}
        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">Frequency</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800"
            placeholder="e.g. Daily, Weekly"
            value={frequency}
            onChangeText={setFrequency}
          />
        </View>

        {/* AI Suggestion Context */}
        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">AI Suggestion</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800"
            placeholder="Any Context for AI Suggestion"
            value={askAI}
            onChangeText={setaskAI}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSaveHabit}
          disabled={loading}
          className="bg-indigo-600 rounded-xl py-4 items-center shadow-lg active:opacity-90">
          <View className="flex-row items-center">
            <Feather name="check" size={20} color="white" />
            <Text className="text-white font-semibold text-lg ml-2">
              Save Habit
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
