import { IAdmin } from "../../interface";

export {}

declare global {
  namespace Express {
    export interface Request {
      admin?: IAdmin
    }
  }
}