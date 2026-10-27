export interface Category {
  _id: string;
  name: string;
}

export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: string | Category;
  rate: number;
  ownerId: string;
  date: string;
}
