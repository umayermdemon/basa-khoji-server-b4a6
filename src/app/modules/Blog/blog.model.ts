import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tags: {
      type: [String],
      default: [],
    },
    coverImageUrl: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const BlogModel = model<IBlog>("Blog", BlogSchema);
