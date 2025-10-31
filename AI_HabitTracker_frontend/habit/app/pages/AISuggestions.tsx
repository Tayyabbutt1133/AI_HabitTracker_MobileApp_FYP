import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

const AISuggestions = () => {
    return (
        <>
            <View className="bg-white p-6 mt-4  rounded-2xl shadow-md">
                <View className="flex-row items-center mb-3">
                    <Feather name="zap" size={20} color="#FACC15" />
                    <Text className="ml-2 text-lg font-semibold text-gray-800">
                        AI Suggestions
                    </Text>
                </View>
                <View className="space-y-2">
                    <Text className="text-gray-600">✨ Drink 2L water daily</Text>
                    <Text className="text-gray-600">✨ Extend reading to 30 mins</Text>
                </View>
            </View>
        </>
    )
}

export default AISuggestions