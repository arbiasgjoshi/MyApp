import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  user: any;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const storedUser = await AsyncStorage.getItem("@AuthUser");
      const storedToken = await AsyncStorage.getItem("@AuthToken");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.Authorization = `Bearer ${storedToken}`;
      }

      setIsLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      const { token, refreshToken, ...user } = response.data;

      // Check if the necessary data is present
      if (token && refreshToken && user) {
        setUser(user);
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        await AsyncStorage.setItem("@AuthUser", JSON.stringify(user));
        await AsyncStorage.setItem("@AuthToken", token);
        await AsyncStorage.setItem("@RefreshToken", refreshToken);
      } else {
        throw new Error("Incomplete login response");
      }
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };


  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem("@AuthUser");
    await AsyncStorage.removeItem("@AuthToken");
    await AsyncStorage.removeItem("@RefreshToken");
    delete axios.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
