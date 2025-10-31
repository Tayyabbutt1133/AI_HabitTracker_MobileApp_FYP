import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from "react-native-toast-message";



export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();




  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      await AsyncStorage.setItem('userId', data?.user?.id);

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Login Successful 🎉",
          text2: "Welcome back!",
        });
        router.push("/pages/dashboard");
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <LinearGradient
        colors={["#EEF2FF", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-20 pb-12 rounded-b-3xl"
      >
        <Text className="text-4xl font-extrabold text-gray-900">
          Welcome Back 👋
        </Text>
        <Text className="text-base text-gray-600 mt-2">
          Log in to continue building your healthy habits.
        </Text>
      </LinearGradient>

      <View className="px-6 mt-10 space-y-6">
        <View>
          <Text className="text-gray-700 font-semibold mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text className="text-gray-700 font-semibold mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900"
            secureTextEntry
          />
        </View>

        <TouchableOpacity className="self-end">
          <Text className="text-indigo-600 font-medium">Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} className="rounded-2xl overflow-hidden">
          <LinearGradient
            colors={["#6366F1", "#4338CA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="py-4 flex-row items-center justify-center"
          >
            <Text className="text-white text-lg font-semibold">Login</Text>
            <Feather name="arrow-right" size={20} color="white" style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don’t have an account? </Text>
          <Link href="/pages/Signup" asChild>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
