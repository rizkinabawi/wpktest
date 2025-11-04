import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INews extends Document {
  date: string;
  category: string;
  title: string;
  description: string;
  content: string;
  status: '公開' | '下書き';
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['お知らせ', '設備導入', '認証取得', 'イベント'],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['公開', '下書き'],
      default: '下書き',
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
NewsSchema.index({ status: 1, createdAt: -1 });
NewsSchema.index({ category: 1 });

const News: Model<INews> = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

export default News;

