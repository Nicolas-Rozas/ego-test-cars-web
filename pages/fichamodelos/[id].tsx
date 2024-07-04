import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "@/Components/NavBar";
import "../../src/app/globals.css";
import Footer from "@/Components/Footer";
import Loader from "@/Components/Loader";
import Error from "@/Components/GenericError";
import { CarModelDetails, ModelFeature } from "@/types/carsTypes";
import styles from "./id.module.css";
import HeroBanner from "@/Components/HeroBanner";
import Highlight from "@/Components/Higlight";
import Carousel from "@/Components/Carousel";

const fetchCarModel = async (id: string): Promise<CarModelDetails> => {
  const response = await fetch(
    `https://challenge.egodesign.dev/api/models/${id}`
  );

  const data = await response.json();
  return data as CarModelDetails;
};

const FichaModelo: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [carModel, setCarModel] = useState<CarModelDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === "string") {
        try {
          const data = await fetchCarModel(id);
          setCarModel(data);
          setIsLoading(false);
        } catch (error:any) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !carModel) {
    return <Error />;
  }

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.content}>
        <HeroBanner carModel={carModel} />
        <div className={styles.bannerContainer}>
          <Carousel modelFeatures={carModel.model_features} />
        </div>
        <Highlight carModel={carModel} />
      </div>
      <Footer />
    </div>
  );
};

export default FichaModelo;
