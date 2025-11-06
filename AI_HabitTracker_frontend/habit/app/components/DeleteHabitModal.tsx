import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const DeleteHabitModal = ({ visible, onClose, habitName, onConfirm }: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black/40 items-center justify-center p-5">
                <View className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md">
                    <Text className="text-xl font-semibold text-gray-800 mb-3 text-center">
                        Delete Habit
                    </Text>

                    <Text className="text-gray-600 mb-6 text-center">
                        Are you sure you want to delete{" "}
                        <Text className="font-semibold text-red-500">
                            {habitName || "this habit"}?
                        </Text>
                    </Text>

                    {error ? (
                        <Text className="text-red-500 text-center mb-3">{error}</Text>
                    ) : null}

                    <View className="flex-row justify-center gap-4">
                        <TouchableOpacity
                            onPress={onClose}
                            disabled={loading}
                            className="bg-gray-200 px-5 py-2 rounded-xl"
                        >
                            <Text className="text-gray-800 font-medium">No</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => onConfirm()}
                            disabled={loading}
                            className="bg-red-500 px-5 py-2 rounded-xl"
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text className="text-white font-medium">Yes, Delete</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteHabitModal;
