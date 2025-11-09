import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  titleEn: string;
  description: string;
  eventType: '展示会' | 'セミナー' | '工場見学' | 'その他';
  startDate: Date;
  endDate: Date;
  location: string;
  organizer?: string;
  registrationUrl?: string;
  images: string[];
  youtubeUrl?: string;  // tambah ini
  status: '予定' | '開催中' | '終了' | 'キャンセル';
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    titleEn: { type: String, required: true },
    description: { type: String, required: true },
    eventType: {
      type: String,
      enum: ['展示会', 'セミナー', '工場見学', 'その他'],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: String },
    registrationUrl: { type: String },
    images: { type: [String], default: [] },
    youtubeUrl: { type: String },  // tambahkan field ini
    status: {
      type: String,
      enum: ['予定', '開催中', '終了', 'キャンセル'],
      default: '予定',
    },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

EventSchema.index({ startDate: -1 });
EventSchema.index({ status: 1 });
EventSchema.index({ isPublic: 1 });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
