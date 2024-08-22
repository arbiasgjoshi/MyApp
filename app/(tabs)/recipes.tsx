import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import axios from "axios";

interface Recipe {
  id: number;
  name: string;
}

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchRecipe();
  }, [page]);

  useEffect(() => {
    if (search) {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLocaleLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [search, recipes]);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/recipes?limit=20&skip=${(page - 1) * 20}`
      );
      setRecipes(response.data.recipes);
      setFilteredRecipes(response.data.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(`https://dummyjson.com/recipes?limit=20&skip=${(page - 1) * 20}`)
  //     .then((response) => setRecipes(response.data.recipes))
  //     .catch((error) => console.error(error));
  // }, [page]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <FlatList
        data={filteredRecipes}
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

export default Recipes;
