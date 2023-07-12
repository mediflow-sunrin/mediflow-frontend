import { authInstance } from "..";

export default async function updateUser(buildingId?: number) {
  const instance = await authInstance();
  const { data } = await instance.put("/user", {
    buildingId,
  });
  return data;
}
