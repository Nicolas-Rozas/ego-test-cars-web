  import React, { useMemo, useState, useCallback } from "react";
  import { montserrat } from "@/fonts/fonts";
  import Image from "next/image";
  import Link from "next/link";
  import styles from "./carModels.module.css";
  import Filter from "../Filter";
  import { LineSeparator } from "../LineSeparator";
  import { CarModel, CarModelsViewState } from "@/types/carsTypes";
  import Error from "../GenericError";
  import useCarModels from "@/hooks";

  const CarModelsList = () => {
    const { carModels, error } = useCarModels();

        const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

    const [viewState, setViewState] = useState<CarModelsViewState>({
      isLoading: true,
      error: null,
      currentFilter: "Todos",
      currentSortOption: "",
    });

    const handleFilterChange = useCallback((filter: string) => {
      setViewState((prevState) => ({ ...prevState, currentFilter: filter }));
    }, []);

    const handleSortChange = useCallback((sortOption: string) => {
      setViewState((prevState) => ({
        ...prevState,
        currentSortOption: sortOption,
      }));
    }, []);

    const handleCardClick = (id: any) => {
      setSelectedModelId(id);
    };

    const filteredAndSortedCarModels = useMemo(() => {
      const sortOptions: Record<string, (a: CarModel, b: CarModel) => number> = {
        "menor-mayor": (a, b) => a.price - b.price,
        "mayor-menor": (a, b) => b.price - a.price,
        "nuevos-viejos": (a, b) => b.year - a.year,
        "viejos-nuevos": (a, b) => a.year - b.year,
      };

      let filteredCars = [...carModels];

      if (viewState.currentFilter !== "Todos") {
        filteredCars = filteredCars.filter((car) => {
          if (viewState.currentFilter === "Autos") {
            return car.segment === "Sedan";
          } else if (viewState.currentFilter === "SUVs y Crossovers") {
            return car.segment === "SUVs" || car.segment === "Crossovers";
          } else {
            return car.segment === viewState.currentFilter;
          }
        });
      }

      return filteredCars.sort(
        sortOptions[viewState.currentSortOption] || (() => 0)
      );
    }, [carModels, viewState.currentFilter, viewState.currentSortOption]);

    if (error) {
      return <Error />;
    }

    return (
      <div style={{ height: "100%", minHeight: "100vh" }}>
        <Filter
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <LineSeparator />
        <div className={styles.carGrid}>
          {filteredAndSortedCarModels.map((car) => (
            <div
              key={car.id}
              className={`${montserrat.className} ${styles.carCard}`}
            >
              <div className={styles.carContent}>
                <p
                  className={`${styles.carName} ${
                    selectedModelId === car.id ? styles.selectedCarName : ""
                  }`}
                >
                  {car.name}
                </p>
                <div className={styles.priceYearContainer}>
                  <p className={styles.yearPriceStyle}>{car.year}</p>
                  <div style={{ paddingInline: 5 }}> | </div>
                  <p className={styles.yearPriceStyle}>
                    $ {car.price.toLocaleString()}
                  </p>
                </div>
                <div className={styles.imageWrapper}>
                  <Image
                    src={car.photo}
                    alt={car.name}
                    width={300}
                    height={200}
                    layout="intrinsic"
                    className={styles.carImage}
                  />
                </div>
              </div>
              {selectedModelId === car.id && (
                <div className={styles.buttonContainer}>
                  <Link href={`/fichamodelos/${car.id}`} passHref>
                    <button className={styles.verModeloButton}>Ver modelo</button>
                  </Link>
                </div>
              )}
              <div
                className={styles.cardOverlay}
                onClick={() => handleCardClick(car.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default React.memo(CarModelsList);
