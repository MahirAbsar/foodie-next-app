import { Suspense } from "react";
import Link from "next/link";

import MealsGrid from "@/components/meals/meals-grid";
import classes from "./page.module.css";
import { getMeals } from "@/lib/meals";

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

const MealsPage = async () => {
  const meals = await getMeals();
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created by{" "}
          <span className={classes.highlight}>you</span>{" "}
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching Meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};
export default MealsPage;
