import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiInstance } from "..";

type Prop = {
  id: string;
  password: string;
};

export default async function login(prop: Prop) {
  const { data } = await apiInstance.post("/auth/login", prop);
  await AsyncStorage.setItem("token", data.token);
  return data;
}
