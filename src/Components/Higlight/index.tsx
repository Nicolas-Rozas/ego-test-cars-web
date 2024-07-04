import { montserrat } from "@/fonts/fonts";
import React from "react";
import styles from "./highlight.module.css";
import { CarModelDetails, ModelHighlight } from "@/types/carsTypes";
import Image from "next/image";

interface HighlightProps {
  carModel: CarModelDetails;
}

const Highlight = ({ carModel }: HighlightProps) => {
  return (
    <div className={styles.highlightsContainer}>
      {carModel.model_highlights.map((highlight: ModelHighlight, index) => (
        <div
          key={index}
          className={`${styles.highlight} ${
            index === 1 ? styles.highlightReversed : ""
          }`}
        >
          <div className={styles.highlightImage}>
            <Image
              src={highlight.image}
              alt={highlight.title}
              width={500}
              height={300}
            />
          </div>
          <div className={styles.highlightContent}>
            <p className={`${montserrat.className} ${styles.highlightTitle}`}>
              {highlight.title}
            </p>
            <div
              className={`${montserrat.className} ${styles.highlightDescription}`}
              dangerouslySetInnerHTML={{ __html: highlight?.content }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Highlight;
