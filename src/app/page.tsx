"use client";
import type { NextPage } from "next";
import { useState } from "react";
import ForYou from "./for-you";
import styles from "./frame-component3.module.css";

export type FrameComponent3Type = {
  className?: string;
};

const FrameComponent3: NextPage<FrameComponent3Type> = ({ className = "" }) => {
  const [forYouItems] = useState([
    {
      mode: "Mode13" as const,
      rectangle2: "/Rectangle 23@2x.png",
      cleanCodeAHandbookOfAgileSo: "Clean Code: A Handbook of Agile So..",
      robertCMartin: "Robert C. Martin",
    },
    {
      mode: "B2" as const,
      rectangle2: "/Rectangle 26@2x.png",
      cleanCodeAHandbookOfAgileSo: "The Lean Startup",
      robertCMartin: "Eric Ries",
    },
    {
      mode: "B3" as const,
      rectangle2: "/Rectangle 25@2x.png",
      cleanCodeAHandbookOfAgileSo: "Pride and Prejudice",
      robertCMartin: "Jane Austen",
    },
    {
      mode: "B4" as const,
      rectangle2: "/Rectangle 24@2x.png",
      cleanCodeAHandbookOfAgileSo:
        "Atomic Habits: An Easy & Proven Way to Build..",
      robertCMartin: "James Clear",
    },
    {
      mode: "B6" as const,
      rectangle2: "/Rectangle 2@2x.png",
      cleanCodeAHandbookOfAgileSo: "Dune",
      robertCMartin: "Frank Patrick Herbert",
    },
    {
      mode: "B7" as const,
      rectangle2: "/Rectangle 22@2x.png",
      cleanCodeAHandbookOfAgileSo:
        "Zero to One: Notes on Startups, or How to..",
      robertCMartin: "Peter Thiel, Blake Masters",
    },
  ]);
  return (
    <section className={[styles.frameParent, className].join(" ")}>
      <div className={styles.trendingNowParent}>
        <h2 className={styles.trendingNow}>Trending Now</h2>
        <h3 className={styles.checkOutThe}>
          Check out the most popular and frequently borrowed books by students
          this week.
        </h3>
      </div>
      <section className={styles.forYouParent}>
        {forYouItems.map((item, index) => (
          <ForYou
            key={index}
            mode={item.mode}
            rectangle2={item.rectangle2}
            cleanCodeAHandbookOfAgileSo={item.cleanCodeAHandbookOfAgileSo}
            robertCMartin={item.robertCMartin}
          />
        ))}
      </section>
    </section>
  );
};

export default FrameComponent3;
