import "dotenv/config";
import { Bot, GrammyError, HttpError } from "grammy";
import { User } from "grammy/types";

import { mainMenu } from "./menus/main-menu";
import { checkUserInDb } from "./util/check-user-in-db";
import { addUser } from "./db/db.user-actions";

const bot = new Bot(process.env.BOT_TOKEN as string);

bot.use(async (ctx, next) => {
  const user = ctx.from;
  if (!user) return await ctx.reply("No ID");
  next();
});
bot.use(mainMenu);

bot.api.setMyCommands([
  { command: "menu", description: "Open Main Menu" }
]);

bot.command("start", async (ctx) => {
  const user = ctx.from as User;
  const id = user.id;
  const lang = user.language_code ?? "en";
  
  const userInDb = await checkUserInDb(id);
  if (!userInDb) {
    if (userInDb === null) return await ctx.reply("An error occurred");
    const res = await addUser(id, lang);
    if (res === null) return await ctx.reply("An error occurred");
  } 
  await ctx.reply("Main Menu", { reply_markup: mainMenu });
});

bot.command("menu", async (ctx) => {
  await ctx.reply("Main Menu", { reply_markup: mainMenu });
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
