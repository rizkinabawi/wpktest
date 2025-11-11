import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IApplication extends Document {
  position: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  experience: string;
  motivation: string;
  resumeUrl?: string;
  status: '新規' | '書類選考中' | '面接予定' | '採用' | '不採用';
  referenceNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    position: {
      type: String,
      required: true,
      enum: ['メッキ技術者', '品質管理スタッフ', '製造補助スタッフ'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
    },
    motivation: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ['新規', '書類選考中', '面接予定', '採用', '不採用'],
      default: '新規',
    },
    referenceNumber: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate reference number before saving
ApplicationSchema.pre('save', async function (next) {
  if (!this.referenceNumber) {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const count = await mongoose.model('Application').countDocuments();
    this.referenceNumber = `APP-${dateStr}${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Index for faster queries
ApplicationSchema.index({ status: 1, createdAt: -1 });

const Application: Model<IApplication> =
  mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);
export default /** @type {import("mongoose").Model<import("mongoose").Document>}*/ (Application)
