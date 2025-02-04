import { TEvent } from "../types";
import { errorLogger } from "../util/error-logger";
import { db } from "./db";

export async function getAllEvents(userId: number) {
  try {
    const { rows } = await db.query(
      `
        SELECT * 
        FROM event_tbl
        WHERE user_id = $1;
      `,
      [userId]
    );

    return rows as TEvent[];
  } catch (error) {
    errorLogger("DB.getAllEvents()", error);
    return null;
  }
}

export async function getActiveEvents(userId: number) {
  try {
    const { rows } = await db.query(
      `
        SELECT * 
        FROM event_tbl
        WHERE 
          user_id = $1
          AND 
          active = true;
      `,
      [userId]
    );

    return rows as TEvent[];
  } catch (error) {
    errorLogger("DB.getActiveEvents()", error);
    return null;
  }
} 