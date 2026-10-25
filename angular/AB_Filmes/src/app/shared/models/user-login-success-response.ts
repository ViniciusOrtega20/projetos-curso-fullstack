export interface UserLoginSuccessResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  }
}
