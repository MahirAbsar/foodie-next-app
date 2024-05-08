const sql = require("better-sqlite3");

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("There was an error");
  return db.prepare("SELECT * from meals").all();
}
