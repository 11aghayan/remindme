import { Pool } from "pg";

const {
  PG_HOST,
  PG_USER,
  PG_PORT,
  PG_PASSWORD,
  PG_DB
} = process.env as { [key: string]: string };

export const db = new Pool({
  host: PG_HOST,
  port: Number(PG_PORT ?? "5432"),
  database: PG_DB,
  user: PG_USER,
  password: PG_PASSWORD
});