import { authInstance } from "..";

export default async function getBuilding() {
  const instance = await authInstance();
  const { data } = await instance.get("/building");
  return data;
}
