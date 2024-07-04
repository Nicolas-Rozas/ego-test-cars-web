import { useEffect, useState } from "react";
import { CarModel } from "@/types/carsTypes";

const useCarModels = () => {
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const response = await fetch(
          "https://challenge.egodesign.dev/api/models/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setCarModels(data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarModels();
  }, []);

  return { carModels, isLoading, error };
};

export default useCarModels;
