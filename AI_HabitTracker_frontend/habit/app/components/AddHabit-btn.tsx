import React from 'react'
import { Text } from 'react-native'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

const AddHabitBtn = () => {
    return (
        <>
            <Link href="/pages/add-habit" asChild>
                <TouchableOpacity className="flex-1 bg-green-500 py-3 ml-2 rounded-xl items-center active:opacity-90 flex-row justify-center">
                    <Feather name="plus-circle" size={18} color="white" />
                    <Text className="text-white font-semibold ml-2">
                        Add Habit
                    </Text>
                </TouchableOpacity>
            </Link>

        </>
    )
}

export default AddHabitBtn