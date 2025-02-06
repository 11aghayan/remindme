import { TUser } from "../types";
import { errorLogger } from "../util/error-logger";
import { db } from "./db";



export async function getUser(id: number) {
  try {
    const { rows } = await db.query(
      `
        SELECT * 
        FROM user_tbl
        WHERE id = $1;
      `,
      [id]
    );

    return rows[0] as TUser;
  } catch (error) {
    errorLogger("DB.addUser()", error);
    return null;
  }
}

export async function addUser(id: number, lang: string) {
  try {
    await db.query(
      `
        INSERT INTO 
        user_tbl (id, lang)
        VALUES
        ($1, $2);
      `,
      [id, lang]
    );

    return true;
  } catch (error) {
    errorLogger("DB.addUser()", error);
    return null;
  }
}

export async function updateTimeFormat(userId: number, timeFormat: string) {
  try {
    await db.query(
      `
        UPDATE user_tbl
        SET time_format = $2
        WHERE id = $1;
      `,
      [userId, timeFormat]
    );

    return true;
  } catch (error) {
    errorLogger("DB.updateTimeFormat()", error);
    return null;
  }
}

export async function updateTimezone(userId: number, timezone: string) {
  try {
    await db.query(
      `
        UPDATE user_tbl
        SET timezone = $2
        WHERE id = $1;
      `,
      [userId, timezone]
    );

    return true;
  } catch (error) {
    errorLogger("DB.updateTimezone()", error);
    return null;
  }
}