import React from 'react'
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';


const Habits = ({habit, index}: any) => {
  return (
      <>
        <Animated.View
            key={habit.id}
            entering={FadeInDown.delay(index * 100).springify()}
            className="bg-white mb-4 p-5 rounded-2xl shadow-md border border-gray-100"
            style={{ elevation: 3 }}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center mb-3">
              <Link href={`/pages/habit-details/${habit.id}`} asChild>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 pr-4"
                >
                  <Text className="text-lg font-semibold text-gray-800">
                    {habit.habit_name}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {habit.frequency}
                  </Text>
                </TouchableOpacity>
              </Link>
              <Feather name="chevron-right" size={22} color="#6B7280" />
            </View>

            {/* Description */}
            {habit.description ? (
              <Text className="text-gray-600 text-sm leading-5 mb-3">
                {habit.description}
              </Text>
            ) : null}

            {/* Progress */}
            {/* <View className="mt-1 mb-3">
              <Progress.Bar
                progress={habit.progress || 0.5}
                width={null}
                color="#4F46E5"
                unfilledColor="#E5E7EB"
                borderWidth={0}
                height={8}
                borderRadius={10}
                animationType="spring"
              />
              <Text className="text-gray-500 text-xs mt-1">
                {Math.round((habit.progress || 0.5) * 100)}% completed
              </Text>
            </View> */}

            {/* AI Suggestion */}
            {habit.AIsuggestions ? (
              <View className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 mt-1">
                <Text className="text-indigo-600 text-sm font-medium mb-1">
                  💡 AI Suggestion
                </Text>
                <Text className="text-gray-700 text-sm leading-5">
                  {habit.AIsuggestions}
                </Text>
              </View>
            ) : null}
          </Animated.View>
      </>
  )
}

export default Habits
