import { UserMin } from "./UserMin";

export type PostModel = {
  _id: string;
  content: string;
  user: UserMin;
  created_at: string;
};
