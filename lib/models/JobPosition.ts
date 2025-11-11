import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJobPosition extends Document {
  title: string;
  department: string;
  location: string;
  employmentType: '正社員' | '契約社員' | 'パート・アルバイト' | '派遣社員';
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  status: '公開' | '非公開' | '募集終了';
  applicationDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobPositionSchema = new Schema<IJobPosition>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      default: '東京都',
    },
    employmentType: {
      type: String,
      required: true,
      enum: ['正社員', '契約社員', 'パート・アルバイト', '派遣社員'],
      default: '正社員',
    },
    salary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['公開', '非公開', '募集終了'],
      default: '公開',
    },
    applicationDeadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
JobPositionSchema.index({ status: 1, createdAt: -1 });

const JobPosition: Model<IJobPosition> =
  mongoose.models.JobPosition || mongoose.model<IJobPosition>('JobPosition', JobPositionSchema);

export default /** @type {import("mongoose").Model<import("mongoose").Document>}*/ (JobPosition)

