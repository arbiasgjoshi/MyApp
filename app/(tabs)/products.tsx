import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Button,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchProduct();
  }, [page]);

  useEffect(() => {
    if (search) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=20&skip=${(page - 1) * 20}`
      );
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <FlatList
        data={filteredProducts}
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
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
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
