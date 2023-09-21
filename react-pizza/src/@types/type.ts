import { store } from '../redux/store';
export interface IItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
  count: number;
}

export interface IPizzaItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: string;
  sizes: number;
  category: number;
  rating: number;
  count: number;
}

export type RootState = ReturnType<typeof store.getState>;

type Sort = {
  name: string;
  sortProperty: '-rating' | 'rating' | '-price' | 'price' | '-title' | 'title';
};
export interface IFilter {
  categoryId: number;
  sort: Sort;
  currentPage: number;
  searchValue: string;
}

export interface Pizza {
  items: IItem[];
  status: 'loading' | 'success' | 'error';
}
