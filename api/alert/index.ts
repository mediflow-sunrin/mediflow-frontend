import { authInstance } from "..";

export default async function getAlert(id: number) {
  const instance = await authInstance();
  const { data } = await instance.get(`/alert?id=${id}`);
  return data;
}
