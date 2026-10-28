import { Story } from "@/types/story"

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  articlesAmount: number;
  savedArticles: Story[];
}