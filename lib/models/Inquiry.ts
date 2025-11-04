import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
  companyName: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: '未読' | '対応中' | '対応済';
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
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
    service: {
      type: String,
      required: true,
      enum: ['見積り依頼', '技術相談', '工場見学', 'その他'],
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['未読', '対応中', '対応済'],
      default: '未読',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
InquirySchema.index({ status: 1, createdAt: -1 });

const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;

