import { Stack } from "expo-router";
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
      <Stack.Screen name="all-habits" options={{ title: "AllHabits" }} />
      <Stack.Screen name="pages/habit-details/[id]"
        options={{ title: "Habit " }}
      />Detail
      <Toast/>
    </Stack>
  )
}
