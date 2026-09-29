import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  tech: string[];
  live: string;
  github: string;
  color: string;
  image: string;
  imagePublicId?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    tech: { type: [String], default: [] },
    live: { type: String, required: true, trim: true },
    github: { type: String, required: true, trim: true },
    color: { type: String, required: true, default: "#facc15" },
    image: { type: String, required: true },
    imagePublicId: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project =
  (models.Project as mongoose.Model<IProject>) ||
  model<IProject>("Project", ProjectSchema);

export default Project;
