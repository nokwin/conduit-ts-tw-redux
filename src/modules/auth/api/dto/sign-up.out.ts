export interface SignUpOutDTO {
  user: User;
}

interface User {
  username: string;
  email: string;
  password: string;
}
