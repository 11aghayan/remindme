import * as DbUser from "../db/db.user-actions";

export async function checkUserInDb(id: number) {
  const user = await DbUser.getUser(id);
  if (user === null) return null;
  return !!user;
}