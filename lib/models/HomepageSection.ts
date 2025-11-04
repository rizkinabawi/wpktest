import mongoose, { Document, Schema } from 'mongoose';

export interface IHomepageSection extends Document {
  sectionId: string; // 'hero', 'about', 'services', 'technology', 'news', 'company', 'recruit', 'contact'
  title: string;
  order: number;
  isVisible: boolean;
  content: {
    // Hero Section
    badge?: {
      icon?: string;
      text?: string;
    };
    heading?: string;
    subheading?: string;
    description?: string;
    buttons?: Array<{
      text: string;
      link: string;
      variant: 'primary' | 'secondary';
    }>;
    features?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    image?: string;
    
    // About Section
    stats?: Array<{
      value: string;
      label: string;
      icon?: string;
    }>;
    
    // Technology Section
    technologies?: Array<{
      name: string;
      description: string;
      icon?: string;
    }>;
    
    // Company Section
    companyInfo?: {
      name?: string;
      established?: string;
      capital?: string;
      employees?: string;
      address?: string;
      phone?: string;
      fax?: string;
      email?: string;
      businessHours?: string;
      certifications?: string[];
    };
    
    // Contact Section
    contactInfo?: {
      phone?: string;
      email?: string;
      address?: string;
      businessHours?: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const HomepageSectionSchema = new Schema<IHomepageSection>(
  {
    sectionId: {
      type: String,
      required: true,
      unique: true,
      enum: ['hero', 'about', 'services', 'technology', 'news', 'company', 'recruit', 'contact'],
    },
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      required: true,
      default: true,
    },
    content: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Index for ordering
HomepageSectionSchema.index({ order: 1 });

export default mongoose.models.HomepageSection || mongoose.model<IHomepageSection>('HomepageSection', HomepageSectionSchema);

