import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useRouter } from "expo-router";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const router = useRouter();

  const handleChangePassword = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          oldPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/(tabs)/dashboard')
      } else {
        Alert.alert("⚠️ Error", data.message || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("⚠️ Error", "Network or server error");
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-semibold text-center mb-6">
        Change Password
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 rounded-2xl p-3 mb-5 bg-gray-50"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Old Password */}
      <View className="flex-row items-center border border-gray-300 rounded-2xl p-3 mb-5 bg-gray-50">
        <TextInput
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry={!showOld}
          className="flex-1"
        />
        <TouchableOpacity onPress={() => setShowOld(!showOld)}>
          {showOld ? <EyeOff size={22} color="gray" /> : <Eye size={22} color="gray" />}
        </TouchableOpacity>
      </View>

      {/* New Password */}
      <View className="flex-row items-center border border-gray-300 rounded-2xl p-3 mb-5 bg-gray-50">
        <TextInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNew}
          className="flex-1"
        />
        <TouchableOpacity onPress={() => setShowNew(!showNew)}>
          {showNew ? <EyeOff size={22} color="gray" /> : <Eye size={22} color="gray" />}
        </TouchableOpacity>
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={handleChangePassword}
        className="bg-blue-600 p-4 rounded-2xl mt-3 active:opacity-80"
      >
        <Text className="text-center text-white font-semibold text-lg">
          Change Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
