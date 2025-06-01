import { ObjectId } from "mongoose";

export interface IBlog {
  title: string;
  content: string;
  author: ObjectId;
  tags?: string[];
  coverImageUrl?: string;
  isPublished?: boolean;
  isDeleted?: boolean;
}
