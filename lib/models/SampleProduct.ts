import mongoose, { Document, Schema } from 'mongoose';

export interface ISampleProduct extends Document {
  title: string;
  titleEn: string;
  category: string;
  description: string;
  process: string[];
  materials: string[];
  specifications: { size?: string; weight?: string; finish?: string; thickness?: string };
  images: string[];
  features: string[];
  applications: string[];
  status: '公開' | '非公開';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SampleProductSchema = new Schema<ISampleProduct>(
  {
    title: { type: String, required: true },
    titleEn: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    process: { type: [String], default: [] },
    materials: { type: [String], default: [] },
    specifications: { size: String, weight: String, finish: String, thickness: String },
    images: { type: [String], default: [] },
    features: { type: [String], default: [] },
    applications: { type: [String], default: [] },
    status: { type: String, enum: ['公開', '非公開'], default: '公開' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

SampleProductSchema.index({ order: 1 });
SampleProductSchema.index({ category: 1 });
SampleProductSchema.index({ status: 1 });

// Penting: cek kalau sudah ada model di mongoose.models
const SampleProductModel =
  mongoose.models.SampleProduct || mongoose.model<ISampleProduct>('SampleProduct', SampleProductSchema);

export default SampleProductModel;
