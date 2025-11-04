import { Stack } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Toast from 'react-native-toast-message'
import './globals.css'

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="Signup" options={{ title: "Signup" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="progress" options={{ title: "Progress" }} />
      <Stack.Screen name="add-habit" options={{ title: "AddHabit" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      {/* This is your tab navigation */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />


      <Stack.Screen name="all-habits" options={{ title: "AllHabits" }} />
      <Stack.Screen name="habit-details/[id]"
        options={{ title: "Habit " }}
      />Detail
      <Toast />
    </Stack>
  )
}