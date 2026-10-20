import { Article } from "@/types/article"

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  articlesAmount: number;
  savedArticles: Article[];
}