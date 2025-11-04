import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
  company: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  notifications: {
    newInquiry: boolean;
    newApplication: boolean;
    weeklyReport: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    company: {
      name: {
        type: String,
        default: '有限会社 鷲津メッキ工業所',
      },
      email: {
        type: String,
        default: 'info@washidu-mekki.com',
      },
      phone: {
        type: String,
        default: '03-XXXX-XXXX',
      },
      address: {
        type: String,
        default: '東京都XX区XXXX-XX-XX',
      },
    },
    notifications: {
      newInquiry: {
        type: Boolean,
        default: true,
      },
      newApplication: {
        type: Boolean,
        default: true,
      },
      weeklyReport: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;

