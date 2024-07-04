import React from "react";
import styles from "./error.module.css";

const Error = ({}) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>
        Ocurrió un error intentelo nuevamente
      </p>
    </div>
  );
};

export default Error;
