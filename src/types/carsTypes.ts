export type CarModel = {
  id: number | string;
  name: string;
  segment: string;
  year: number;
  price: number;
  thumbnail: string;
  photo: string;
};

export type CarModelsResponse = CarModel[];

export interface ModelFeature {
  name: string;
  description: string;
  image: string;
}

export interface ModelHighlight {
  title: string;
  content: string;
  image: string;
}

export interface CarModelDetails {
  title: string;
  id: number | string;
  name: string;
  segment: string;
  year: number;
  price: number;
  description?: string;
  thumbnail: string;
  photo: string;
  model_features: ModelFeature[];
  model_highlights: ModelHighlight[];
}

export interface CarModelsViewState {
  isLoading: boolean;
  error: string | null;
  currentFilter: string;
  currentSortOption: string;
}
