import mongoose, { Document, Schema } from 'mongoose';

export interface IEquipment extends Document {
  name: string;
  nameEn: string;
  category: string; // '設備' | '機械' | '検査装置' etc
  description: string;
  specifications: string[];
  manufacturer?: string;
  model?: string;
  yearInstalled?: number;
  image?: string;
  status: '稼働中' | 'メンテナンス中' | '停止中';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const EquipmentSchema = new Schema<IEquipment>(
  {
    name: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    specifications: {
      type: [String],
      default: [],
    },
    manufacturer: {
      type: String,
    },
    model: {
      type: String,
    },
    yearInstalled: {
      type: Number,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ['稼働中', 'メンテナンス中', '停止中'],
      default: '稼働中',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

EquipmentSchema.index({ order: 1 });
EquipmentSchema.index({ category: 1 });

export default mongoose.models.Equipment || mongoose.model<IEquipment>('Equipment', EquipmentSchema);

