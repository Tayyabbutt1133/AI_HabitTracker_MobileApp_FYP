import { View, Text } from "react-native";

const FeatureCard = ({ title, desc }: { title: any; desc: any }) => (
  <View className="bg-gray-50 p-5 rounded-2xl shadow-sm">
    <Text className="text-lg font-semibold text-gray-800">{title}</Text>
    <Text className="text-sm text-gray-600 mt-1">{desc}</Text>
  </View>
);

export default FeatureCard;
