import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Button } from "react-native";
import axios from "axios";

interface Recipe {
  id: number;
  name: string;
}

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/recipes?limit=20&skip=${(page - 1) * 20}`)
      .then((response) => setRecipes(response.data.recipes))
      .catch((error) => console.error(error));
  }, [page]);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
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

export default Recipes;
