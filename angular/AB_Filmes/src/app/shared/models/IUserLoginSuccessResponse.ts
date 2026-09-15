export interface IUserLoginSuccessResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}
