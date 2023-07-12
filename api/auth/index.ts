import { authInstance } from "..";

export default async function checkUser() {
  const instance = await authInstance();
  const { data } = await instance.get("/auth");
  return data;
}
