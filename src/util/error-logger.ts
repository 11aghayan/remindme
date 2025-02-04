export function errorLogger(fnName: string, error: unknown) {
  const date = new Date(Date.now()).getUTCDate();
  console.error(date + " | " + fnName + ": " + error);
}