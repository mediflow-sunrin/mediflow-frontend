import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "https://medi.plebea.com",
  withCredentials: true,
});

export async function authInstance() {
  const instance = axios.create({
    baseURL: "https://medi.plebea.com",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        AsyncStorage.clear();
      }
      return error;
    }
  );

  return instance;
}
