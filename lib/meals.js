import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";

const sql = require("better-sqlite3");

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * from meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * from meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("There was an error!");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT into meals
    (title, summary, instructions, creator, creator_email,image, slug)
    VALUES(
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
