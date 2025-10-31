import React from 'react'
import Animated, { FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';


const Habits = ({ habit, index }: any) => {
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
                <span className='font-bold'>Frequency : </span>{habit.frequency}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                <span className='font-bold'>Status : </span>{habit.status.charAt(0).toUpperCase() + habit.status.slice(1)}
              </Text>
            </TouchableOpacity>
          </Link>
          <Feather name="chevron-right" size={22} color="#6B7280" />
        </View>

        {/* Description */}
        {habit.description ? (
          <Text className="text-gray-600 text-sm leading-5 mb-3">
            <span className='font-bold'>Description : </span>{habit.description}
          </Text>
        ) : null}

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
