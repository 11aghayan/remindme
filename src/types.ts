export type TEvent = {
  id: string,
  user_id: number,
  name: string,
  next_remind_date: number,
  repeat: string,
  active: boolean,
  priority: string,
  creation_date: string
};  

export type TUser = {
  id: number,
  timezone: string,
  lang: string,
  time_format: string,
  join_date: string
}