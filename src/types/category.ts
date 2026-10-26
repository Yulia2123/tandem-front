export interface Category {
  _id: string;
  category: string;
}

export interface CategoriesResponse {
  categories: Category[];
}
