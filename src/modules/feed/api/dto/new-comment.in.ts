export interface NewCommentInDTO {
  comment: Comment;
}

interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}

interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
