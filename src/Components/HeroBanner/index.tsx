import React from "react";
import Image from "next/image";
import styles from "./hero.module.css";
import { CarModelDetails } from "@/types/carsTypes";
import { montserrat } from "@/fonts/fonts";

interface HeroBannerProps {
  carModel: CarModelDetails;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ carModel }) => {
  return (
    <div className={styles.heroStyles}>
      <Image
        src={carModel.photo}
        alt={carModel.name}
        width={647}
        height={304}
        layout="intrinsic"
      />
      <div className={styles.heroContent}>
        <p className={`${montserrat.className} ${styles.nameStyles}`}>
          {carModel?.name}
        </p>
        <p className={`${montserrat.className} ${styles.titleStyles}`}>
          {carModel?.title}
        </p>
        {carModel?.description && (
          <div
            className={`${montserrat.className} ${styles.descriptionStyles}`}
            dangerouslySetInnerHTML={{ __html: carModel.description }}
          />
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
