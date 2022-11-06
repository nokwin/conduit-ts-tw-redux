export interface SignInOutDTO {
  user: User;
}

interface User {
  email: string;
  password: string;
}
