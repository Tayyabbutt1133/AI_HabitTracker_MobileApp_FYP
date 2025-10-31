import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import DeleteHabitModal from "@/app/components/DeleteHabitModal";
import EditHabitModal from "@/app/components/EditHabitModal";

export default function HabitDetail() {
  const { id } = useLocalSearchParams();
  const [habit, setHabit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchHabitDetail = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/habit-detail/${id}`);
        const data = await res.json();
        setHabit(data.data);
      } catch (error) {
        console.error("Error fetching habit:", error);
        Alert.alert("Error", "Failed to load habit details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabitDetail();
  }, [id]);

  // Handlers
  const handleEdit = () => setShowEditModal(true);
  const handleDelete = () => setShowDeleteModal(true);

  const confirmDelete = async (habitId: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/delete-habit/${habitId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Response from delete API : ", data);
      if (res.ok) {
        Alert.alert("Deleted", "Habit deleted successfully!");
        router.push('/pages/dashboard')
      } else {
        Alert.alert("Error", "Failed to delete habit.");
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-gray-600 mt-2">Loading habit details...</Text>
      </View>
    );
  }

  if (!habit) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-700 text-lg">No habit found!</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-5">
      <View className="bg-white rounded-2xl shadow-md p-6 mb-5">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          {habit.habit_name}
        </Text>
        <Text className="text-gray-600 mb-4">{habit.description}</Text>

        <View className="bg-blue-50 rounded-xl p-4 mb-4">
          <Text className="text-blue-700 font-semibold mb-1">Frequency</Text>
          <Text className="text-gray-800">{habit.frequency}</Text>
        </View>
        <View className="bg-blue-50 rounded-xl p-4 mb-4">
          <Text className="text-blue-700 font-semibold mb-1">Status</Text>
          <Text className="text-gray-800">{habit.status.charAt(0).toUpperCase() + habit.status.slice(1)}</Text>
        </View>

        <View className="bg-yellow-50 rounded-xl p-4 mb-4">
          <Text className="text-yellow-700 font-semibold mb-1">Ask AI</Text>
          <Text className="text-gray-800">{habit.askAI}</Text>
        </View>

        <View className="bg-green-50 rounded-xl p-4 mb-6">
          <Text className="text-green-700 font-semibold mb-1">
            AI Suggestions
          </Text>
          <Text className="text-gray-800 leading-5">{habit.AIsuggestions}</Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            onPress={handleEdit}
            className="bg-blue-600 px-6 py-3 rounded-2xl shadow-md"
          >
            <Text className="text-white font-semibold text-base">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            className="bg-red-500 px-6 py-3 rounded-2xl shadow-md"
          >
            <Text className="text-white font-semibold text-base">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <EditHabitModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        habit={habit}
        onSave={(updated: any) => {
          setHabit(updated);
          Alert.alert("Success", "Habit updated locally!");
        }}
      />
      <DeleteHabitModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => confirmDelete(habit.id)}
        habitName={habit.habit_name}
      />
    </ScrollView>
  );
}
