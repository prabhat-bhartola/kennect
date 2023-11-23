import { UserMin } from "./UserMin";

export type Comment = {
  _id: string;
  content: string;
  user: UserMin;
  post_id: string;
  created_at: string;
};
