import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products?limit=20&skip=${(page - 1) * 20}`)
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error(error));
  }, [page]);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
      <View style={styles.pagination}>
        <Button
          title="Previous Page"
          onPress={() => setPage(page - 1)}
          disabled={page === 1}
        />
        <Button title="Next Page" onPress={() => setPage(page + 1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default Products;
