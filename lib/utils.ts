export interface ArticleProps {
  title: string;
  content: string;
  category: string;
  id: string;
  status: string;
}
export interface Article {
  data: ArticleProps[];
}
