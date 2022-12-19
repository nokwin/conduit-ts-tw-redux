export interface UpdateUserInDTO {
  user: User;
}

interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}
