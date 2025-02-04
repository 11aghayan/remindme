import { getUser } from "../db/db.user-actions";

export async function checkUserInDb(id: number) {
  const user = await getUser(id);
  if (user === null) return null;
  return !!user;
}