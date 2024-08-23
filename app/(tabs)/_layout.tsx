import React from "react"
import { Tabs } from "expo-router"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Colors from "@/constants/Colors"
import { useColorScheme } from "@/components/useColorScheme"
import { useAuth } from "../context/AuthContext" // Adjust the import path if necessary
import { View, ActivityIndicator } from "react-native"

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  if (!user) {
    // If user is not logged in, do nothing since RootNavigation will redirect
    return null
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name='products'
        options={{
          title: "Products",
          tabBarIcon: () => <TabBarIcon name='list-alt' color={"black"} />,
        }}
      />
      <Tabs.Screen
        name='recipes'
        options={{
          title: "Recipes",
          tabBarIcon: () => <TabBarIcon name='cogs' color={"black"} />,
        }}
      />
      <Tabs.Screen
        name='userDetails'
        options={{
          title: "User Details",
          tabBarIcon: () => <TabBarIcon name='user' color={"black"} />,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "Settings",
          tabBarIcon: () => <TabBarIcon name='cogs' color={"black"} />,
        }}
      />
    </Tabs>
  )
}
