import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'

const AISuggestions = () => {



    const [aisuggestions, setAISuggestions] = useState([]);




    const fetchAISuggestion = async () => {

        try {
            const userId = await AsyncStorage.getItem('userId');
            console.log("User Id from storage : ", userId);
            const response = await fetch(`http://localhost:3000/api/all-aisuggestions/${userId}`)
            const data = await response.json();
            console.log("Data is : ", data);
            if (response.ok) {
                setAISuggestions(data.suggestions);
            }
        } catch (error) {

        }

    }


    useEffect(() => {
        fetchAISuggestion();
    }, [])


    console.log("Data is AI Suggestion state : ", aisuggestions);


    return (
        <>
            <View className="bg-white p-6 mt-4  rounded-2xl shadow-md">
                <View className="flex-row items-center mb-3">
                    <Feather name="zap" size={20} color="#FACC15" />
                    <Text className="ml-2 text-lg font-semibold text-gray-800">
                        AI Suggestions
                    </Text>
                </View>
                <ScrollView className="">
                    {aisuggestions.length > 0 ? (
                        aisuggestions.map((suggestion: any, index) => (
                            <View
                                key={index}
                                className="bg-white mt-4 rounded-2xl p-4 shadow-sm border border-gray-100"
                            >
                                <Text className="text-gray-800 font-semibold mb-1">
                                    Suggestion {index + 1}
                                </Text>
                                <Text className="text-gray-600 leading-relaxed">
                                    {suggestion.AIsuggestions}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <View className="items-center py-6">
                            <Text className="text-gray-400 italic">Loading AI suggestions...</Text>
                        </View>
                    )}
                </ScrollView>

            </View>
        </>
    )
}

export default AISuggestions