// models/HomepageSection.ts
import mongoose, { Schema, model, models } from "mongoose";

const HomepageSectionSchema = new Schema(
  {
    sectionId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    content: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default models.HomepageSection ||
  model("HomepageSection", HomepageSectionSchema);
