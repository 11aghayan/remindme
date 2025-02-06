import { Menu, MenuRange } from "@grammyjs/menu";
import { Context } from "grammy";

import { TIMEZONE_LIST } from "../util/constants";
import { formatTimezone } from "../util/formatter";
import * as DbUser from "../db/db.user-actions";

const timezoneRange = new MenuRange();

TIMEZONE_LIST
  .forEach((timezone, i, arr) => {
    timezoneRange 
      .text({ text: formatTimezone(timezone), payload: timezone }, updateTimezone);

    if ((i + 1) % 5 === 0 && arr.length > i + 1) {
      timezoneRange.row();
    }
  });

async function updateTimezone(ctx: Context) {
  const id = ctx.from?.id as number;
  const tz = ctx.match as string;
  const dbRes = await DbUser.updateTimezone(id, tz);
  if (dbRes === null) {
    return await ctx.reply("Error occurred. Timezone not updated");
  }
  return await ctx.reply("Timezone updated. Current timezone is " + formatTimezone(tz));
}

export const timezoneMenu = new Menu("timezone-menu").addRange(timezoneRange);