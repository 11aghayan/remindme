import { Menu } from "@grammyjs/menu";

import { timezoneMenu } from "./timezone-menu";
import { timeFormatMenu } from "./time-format-menu";

export const mainMenu = new Menu("Main Menu")
  .text("Add Event", () => {})
  .row()
  .text("See Active Events" , () => {})
  .row()
  .text("See All Events" , () => {})
  .row()
  .submenu("Change Timezone", "timezone-menu", async (ctx) => {
    await ctx.editMessageText("Choose UTC Timezone");
  })
  .row()
  .submenu("Change Time Format", "time-format-menu", async (ctx) => await ctx.reply("Choose time format", { reply_markup: timeFormatMenu }))
  .row()
  .text("Help");

mainMenu.register(timezoneMenu);
mainMenu.register(timeFormatMenu);