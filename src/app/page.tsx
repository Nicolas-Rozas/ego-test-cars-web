"use client";
import React from "react";
import NavBar from "@/Components/NavBar";
import styles from "./home.module.css";
import { montserrat } from "@/fonts/fonts";
import CarModelsList from "@/Components/CardModelsList";
import Footer from "@/Components/Footer";
import useCarModels from "@/hooks";
import Loader from "@/Components/Loader";

const Home = () => {
  const { isLoading } = useCarModels();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.content}>
        <header>
          <h1 className={`${montserrat.className} ${styles.titleStyles}`}>
            Descubrí todos los modelos
          </h1>
        </header>
        <main>
          <CarModelsList />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
