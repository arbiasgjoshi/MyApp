import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

const UserDetails = () => {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.image }} style={styles.avatar} />
      <Text>Username: {user?.username}</Text>
      <Text>
        Name: {user?.firstName} {user?.lastName}
      </Text>
      <Text>Email: {user?.email}</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default UserDetails;
