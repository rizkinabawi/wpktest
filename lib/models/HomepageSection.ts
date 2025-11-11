import mongoose, { Schema, model, models, Model, Document } from "mongoose";

// Define interface (opsional, tapi bagus untuk TypeScript)
export interface IHomepageSection extends Document {
  sectionId: string;
  title: string;
  order?: number;
  isVisible?: boolean;
  content?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

const HomepageSectionSchema = new Schema<IHomepageSection>(
  {
    sectionId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    content: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// Standardized export: reuse model jika sudah ada
const HomepageSection: Model<IHomepageSection> =
  models.HomepageSection || model<IHomepageSection>("HomepageSection", HomepageSectionSchema);

export default /** @type {import("mongoose").Model<import("mongoose").Document>} */ (HomepageSection);
