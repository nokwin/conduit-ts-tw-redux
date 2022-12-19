export interface UpdateUserOutDTO {
  user: User;
}

interface User {
  email: string;
  password?: string;
  username: string;
  bio: string;
  image: string;
}
