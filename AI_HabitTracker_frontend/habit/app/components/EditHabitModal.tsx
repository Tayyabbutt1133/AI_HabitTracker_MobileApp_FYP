import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";

const EditHabitModal = ({ visible, habit, onClose, onSave }: any) => {
    const [formData, setFormData] = useState(habit || {});
    const [confirming, setConfirming] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSave = async () => {
        if (!confirming) return setConfirming(true);

        try {
            setLoading(true);

            // Dummy update API — replace later
            const response = await fetch(`http://localhost:3000/api/update-habit/${habit.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Update API response:", data);

            if (data.success) {
                Alert.alert("Success", "Habit updated successfully!");
                onSave(formData);
                onClose();
            } else {
                Alert.alert("Error", "Failed to update habit.");
            }
        } catch (error) {
            console.error("Error updating habit:", error);
            Alert.alert("Error", "Something went wrong while updating habit.");
        } finally {
            setLoading(false);
            setConfirming(false);
        }
    };

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black/40 items-center justify-center p-5">
                <View className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
                    <Text className="text-2xl font-bold text-gray-900 mb-4 text-center">
                        Edit Habit
                    </Text>

                    {/* Name Field */}
                    <View className="mb-4">
                        <Text className="text-gray-700 font-medium mb-1">Name</Text>
                        <TextInput
                            placeholder="Enter habit name"
                            value={formData.habit_name}
                            onChangeText={(text) => handleChange("habit_name", text)}
                            className="border border-gray-300 rounded-lg p-3"
                        />
                    </View>

                    {/* Description */}
                    <View className="mb-4">
                        <Text className="text-gray-700 font-medium mb-1">Description</Text>
                        <TextInput
                            placeholder="Description"
                            value={formData.description}
                            onChangeText={(text) => handleChange("description", text)}
                            multiline
                            className="border border-gray-300 rounded-lg p-3 h-20"
                        />
                    </View>

                    {/* Frequency */}
                    <View className="mb-4">
                        <Text className="text-gray-700 font-medium mb-1">Frequency</Text>
                        <TextInput
                            placeholder="Frequency"
                            value={formData.frequency}
                            onChangeText={(text) => handleChange("frequency", text)}
                            className="border border-gray-300 rounded-lg p-3"
                        />
                    </View>

                    {/* Ask AI */}
                    <View className="mb-4">
                        <Text className="text-gray-700 font-medium mb-1">
                            Ask any new Suggestion from AI
                        </Text>
                        <TextInput
                            placeholder="Ask AI"
                            value={formData.askAI}
                            onChangeText={(text) => handleChange("askAI", text)}
                            className="border border-gray-300 rounded-lg p-3"
                        />
                    </View>

                    {/* Buttons */}
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            onPress={onClose}
                            disabled={loading}
                            className="flex-1 bg-gray-200 py-3 mr-2 rounded-xl items-center"
                        >
                            <Text className="text-gray-800 font-semibold">Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleSave}
                            disabled={loading}
                            className="flex-1 bg-blue-600 py-3 ml-2 rounded-xl items-center"
                        >
                            <Text className="text-white font-semibold">
                                {loading ? "Saving..." : confirming ? "Yes, Save" : "Save"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {confirming && (
                        <Text className="text-center text-gray-500 mt-3 text-sm">
                            Are you sure you want to save changes?
                        </Text>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default EditHabitModal;
