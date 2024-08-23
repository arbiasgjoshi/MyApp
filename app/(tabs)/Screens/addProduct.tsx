import React, { useState } from "react"
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native"
import axios from "axios"

export default function AddProductScreen() {
  const [title, setTitle] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleAddProduct = async () => {
    if (!title || !price) {
      Alert.alert("Error", "Please fill in all fields.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post("https://dummyjson.com/products/add", {
        title: title,
        price: Number(price),
      })

      if (response.status === 200) {
        Alert.alert("Success", "Product added successfully!")
        // Optionally reset the form or navigate back to the product list
        setTitle("")
        setPrice("")
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error)
      Alert.alert("Error", "An error occurred while adding the product.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder='Enter product title'
      />
      <Text style={styles.label}>Product Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder='Enter product price'
        keyboardType='numeric'
      />
      <Button
        title={isSubmitting ? "Adding..." : "Add Product"}
        onPress={handleAddProduct}
        disabled={isSubmitting}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
})
