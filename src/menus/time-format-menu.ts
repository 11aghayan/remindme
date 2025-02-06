import { Menu } from "@grammyjs/menu";
import { Context } from "grammy";

import * as DbUser from "../db/db.user-actions";

export const timeFormatMenu = new Menu("time-format-menu")
  .text({ text: "12H", payload: "12" }, updateTimeFormat)
  .row()
  .text({ text: "24H", payload: "24" }, updateTimeFormat);

async function updateTimeFormat(ctx: Context) {
  const id = ctx.from?.id as number;
  const tf = ctx.match as string;
  const dbRes = await DbUser.updateTimeFormat(id, tf);
  if (dbRes === null) {
    return await ctx.reply("Error occurred. Time format not updated");
  }
  return await ctx.reply("Time format updated. Current time format is " + tf + "H");
} 