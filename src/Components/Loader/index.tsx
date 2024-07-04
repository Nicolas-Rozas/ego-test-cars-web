import React from "react";
import styles from "./loader.module.css";
import { montserrat } from "@/fonts/fonts";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.innerCircle} />
        <div className={styles.outerCircle} />
      </div>
      <p className={`${montserrat.className} ${styles.loaderText}`}>Cargando</p>
    </div>
  );
};

export default Loader;
