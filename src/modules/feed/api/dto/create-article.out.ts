export interface CreateArticleOutDTO {
  article: Article;
}

interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
