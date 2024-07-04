import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./carousel.module.css";
import Image from "next/image";
import { montserrat } from "@/fonts/fonts";

interface CarouselProps {
  modelFeatures: Array<{
    image: string;
    name: string;
    description: string;
  }>;
}

const Carousel: React.FC<CarouselProps> = ({ modelFeatures }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = modelFeatures.length * 3; // Triplicamos las imágenes porque la API originalmente trae solo 2

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.cardContainer}>
        {[...modelFeatures, ...modelFeatures, ...modelFeatures].map(
          (feature, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: `calc(100% * ${index - currentIndex})`,
                transition: { duration: 0.5 },
              }}
            >
              <div className={styles.cardInner}>
                <Image
                  height={200}
                  width={250}
                  src={feature.image}
                  alt={`Feature ${index + 1}`}
                  className={styles.carouselImage}
                />

                <p className={`${montserrat.className} ${styles.cardText}`}>
                  {feature.name}
                </p>
                <p
                  className={`${montserrat.className} ${styles.cardDescription}`}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          )
        )}
      </div>
      <div className={styles.arrowContainer}>
        <FiChevronLeft
          size={30}
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={goToPreviousSlide}
        />
        <FiChevronRight
          size={30}
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={goToNextSlide}
        />
      </div>
      <div className={styles.paginator}>
        {modelFeatures.map((_, index) => (
          <div
            key={index}
            className={`${styles.pageIndicator} ${
              currentIndex % modelFeatures.length === index
                ? styles.selectedPage
                : ""
            }`}
            style={{
              width:
                currentIndex % modelFeatures.length === index ? "39px" : "10px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
