import styles from "./page.module.css";

import { Button } from "@/Components/Buttons/Button";
import { MinimalButton } from "@/Components/Buttons/MinimalButton";
import { AuthContext } from "@/contexts/AuthContext";

import { useContext } from "react";
import { PiUserCirclePlusLight } from "react-icons/pi";

import PostWidget from "@/Components/Posts/PostWidgets/PostWidget";
import HomeHero from "./HomeHero";
import AreasOfExpertise from "./AreasOfExpertise";

export const metadata = {
  title: "Início",
};

const getArticles = async () => {
  const articles = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}posts/getAllArticles/`,
    { cache: "no-store" },
  ).then((res) => res.json());

  return { articles: articles.reverse() };
};

export default async function Home() {
  return (
    <main className={styles.container}>
      <HomeHero />
      <AreasOfExpertise />
      <div>
        <h1>Últimos Artigos</h1>
      </div>
    </main>
  );
}
