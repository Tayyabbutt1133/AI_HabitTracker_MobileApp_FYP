import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

const AllHabitsBtn = () => {
    return (
        <Link href="/pages/all-habits" asChild>
            <TouchableOpacity className="flex-1 bg-indigo-500 py-3 mr-2 rounded-xl items-center active:opacity-90 flex-row justify-center">
                <Feather name="list" size={18} color="white" />
                <Text className="text-white font-semibold ml-2">
                    All Habits
                </Text>
            </TouchableOpacity>
        </Link>
    );
};

export default AllHabitsBtn;
