import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#9ca3af",
      }}
    >
      <Tabs.Screen
        name="signals"
        options={{
          title: "추천 Signal",
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "종목 검색",
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "관심 종목",
        }}
      />

      <Tabs.Screen
        name="my"
        options={{
          title: "내 정보",
        }}
      />
    </Tabs>
  );
}