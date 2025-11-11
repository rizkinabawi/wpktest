import mongoose, { Schema, Model, models } from 'mongoose';

// Schema Equipment
const EquipmentSchema = new Schema(
  {
    name: { type: String, required: true },
    nameEn: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    specifications: { type: [String], default: [] },
    manufacturer: { type: String },
    model: { type: String },
    yearInstalled: { type: Number },
    image: { type: String },
    status: {
      type: String,
      enum: ['稼働中', 'メンテナンス中', '停止中'],
      default: '稼働中',
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Index
EquipmentSchema.index({ order: 1 });
EquipmentSchema.index({ category: 1 });

// Standardized export (sesuai style JobPosition / HomepageSection)
const Equipment: Model<any> = models.Equipment || mongoose.model('Equipment', EquipmentSchema);
export default /** @type {import("mongoose").Model<import("mongoose").Document>} */ (Equipment);
