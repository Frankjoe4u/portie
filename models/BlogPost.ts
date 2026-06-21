import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  tag: string;
  tagColor: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  coverImagePublicId?: string;
  readTime: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    tag: { type: String, required: true, trim: true },
    tagColor: { type: String, required: true, default: "#facc15" },
    date: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    coverImagePublicId: { type: String },
    readTime: { type: String, default: "5 min read" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BlogPost =
  (models.BlogPost as mongoose.Model<IBlogPost>) ||
  model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
