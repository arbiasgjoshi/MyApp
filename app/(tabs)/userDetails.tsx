import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  UserDetails: undefined;
  Products: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "UserDetails">;

const UserDetails: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <Button title="Next" onPress={() => navigation.navigate("Products")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default UserDetails;
