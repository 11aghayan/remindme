import { Menu } from "@grammyjs/menu";

export const timeFormatMenu = new Menu("time-format-menu")
  .text("12H")
  .row()
  .text("24H");