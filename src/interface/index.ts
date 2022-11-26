export interface IAdmin {
  name: string,
  email: string,
  password: string,
  token: string | null,
  confirmed: boolean,
}