import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import Config from "react-native-config";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${Config.BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        router.push("/dashboard");
      } else {
        Alert.alert("Signup Failed", data.message || "Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <LinearGradient
        colors={["#EEF2FF", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-20 pb-14 rounded-b-3xl"
      >
        <Text className="text-4xl font-extrabold text-gray-900">
          Create Account ✨
        </Text>
        <Text className="text-base text-gray-600 mt-2">
          Join us and start building better habits today.
        </Text>
      </LinearGradient>

      {/* Form */}
      <View className="px-6 mt-10 space-y-6">
        {/* Full Name */}
        <View className="space-y-2">
          <Text className="text-gray-700 font-semibold">Full Name</Text>
          <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 shadow-sm">
            <Feather
              name="user"
              size={18}
              color="#6B7280"
              style={{ marginRight: 8 }}
            />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-base text-gray-900"
            />
          </View>
        </View>

        {/* Email */}
        <View className="space-y-2">
          <Text className="text-gray-700 font-semibold">Email</Text>
          <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 shadow-sm">
            <Feather
              name="mail"
              size={18}
              color="#6B7280"
              style={{ marginRight: 8 }}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-base text-gray-900"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password */}
        <View className="space-y-2">
          <Text className="text-gray-700 font-semibold">Password</Text>
          <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 shadow-sm">
            <Feather
              name="lock"
              size={18}
              color="#6B7280"
              style={{ marginRight: 8 }}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-base text-gray-900"
              secureTextEntry
            />
          </View>
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          onPress={handleSignup}
          className="rounded-2xl overflow-hidden shadow-md"
        >
          <LinearGradient
            colors={["#6366F1", "#4338CA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="py-4 flex-row items-center justify-center"
          >
            <Text className="text-white text-lg font-semibold">Sign Up</Text>
            <Feather
              name="arrow-right"
              size={20}
              color="white"
              style={{ marginLeft: 8 }}
            />
          </LinearGradient>
        </TouchableOpacity>

        {/* Login Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/pages/login" asChild>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-semibold">Log In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
