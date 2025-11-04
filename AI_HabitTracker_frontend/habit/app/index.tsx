import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
import FeatureCard from "./components/FeatureCard";
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'


export default function Index() {

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Gradient Hero Section */}
      <LinearGradient
        colors={["#EEF2FF", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-16 pb-10 rounded-b-3xl"
      >

        {/* Header */}
        <Text className="text-4xl font-extrabold text-gray-900">
          Welcome 👋
        </Text>
        <Text className="text-lg text-gray-700 mt-2">
          Build healthy, productive habits with{" "}
          <Text className="font-semibold text-indigo-600">
            AI-powered personalization
          </Text>
          .
        </Text>

        {/* Motivational Subtext */}
        <Text className="text-sm text-gray-500 mt-3 italic">
          “Small steps every day lead to big transformations.”
        </Text>
      </LinearGradient>

      {/* Feature Highlights */}
      <View className="px-6 mt-8 space-y-6">
        <FeatureCard
          title="AI Habit Suggestions"
          desc="Get personalized habits tailored to your lifestyle."
        />
        <FeatureCard
          title="Seamless Tracking"
          desc="Track exercise, hydration, reading, meditation & more in real-time."
        />
        <FeatureCard
          title="Progress Insights"
          desc="Visualize your journey with charts, graphs, and calendars."
        />
        <FeatureCard
          title="Stay Motivated"
          desc="Smart reminders & rewards to keep you on track."
        />
      </View>

      {/* CTA Buttons */}
      <View className="px-6 mt-12 space-y-4 mb-10">
        <Link href="/pages/login" asChild>
          <TouchableOpacity className="rounded-2xl overflow-hidden">
            <LinearGradient
              colors={["#6366F1", "#4338CA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="py-4 flex-row items-center justify-center"
            >
              <Text className="text-white text-lg font-semibold">
                Get Started
              </Text>
              <Feather
                name="arrow-right"
                size={20}
                color="white"
                style={{ marginLeft: 8 }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </Link>

        <Link href="/pages/Signup" asChild>
          <TouchableOpacity className="border border-gray-300 py-4 rounded-2xl">
            <Text className="text-gray-700 text-lg font-semibold text-center">
              Create an Account
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}
