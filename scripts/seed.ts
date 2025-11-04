import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';
import User from '../lib/models/User';
import News from '../lib/models/News';
import Service from '../lib/models/Service';
import Settings from '../lib/models/Settings';
import JobPosition from '../lib/models/JobPosition';

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    await connectDB();

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await User.deleteMany({});
    // await News.deleteMany({});
    // await Service.deleteMany({});
    // await Settings.deleteMany({});

    // Create admin user
    const existingAdmin = await User.findOne({ email: 'admin@washidu-mekki.com' });
    if (!existingAdmin) {
      await User.create({
        name: '管理者',
        email: 'admin@washidu-mekki.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create sample news
    const newsCount = await News.countDocuments();
    if (newsCount === 0) {
      await News.create([
        {
          date: '2025.10.15',
          category: 'お知らせ',
          title: '年末年始休業のお知らせ',
          description: '誠に勝手ながら、年末年始の休業期間についてお知らせいたします。',
          content: '詳細な内容がここに入ります。',
          status: '公開',
          views: 234,
        },
        {
          date: '2025.09.20',
          category: '設備導入',
          title: '新型メッキ装置導入のお知らせ',
          description: '最新のメッキ技術を導入しました。',
          content: '詳細な内容がここに入ります。',
          status: '公開',
          views: 156,
        },
        {
          date: '2025.08.10',
          category: '認証取得',
          title: 'ISO9001認証取得',
          description: '品質管理システムの国際規格を取得しました。',
          content: '詳細な内容がここに入ります。',
          status: '公開',
          views: 189,
        },
      ]);
      console.log('✅ Sample news created');
    } else {
      console.log('ℹ️  News already exist');
    }

    // Create sample services
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      await Service.create([
        {
          title: '亜鉛メッキ',
          titleEn: 'Zinc Plating',
          description: '優れた防錆性能を持つ、最も一般的な表面処理。',
          features: ['優れた防錆性', 'コストパフォーマンス', '環境に優しい'],
          applications: ['自動車部品', '建築金物', '電気機器'],
          color: 'from-gray-400 to-gray-600',
        },
        {
          title: 'ニッケルメッキ',
          titleEn: 'Nickel Plating',
          description: '耐食性と装飾性を兼ね備えた高品質な表面処理。',
          features: ['高い耐食性', '美しい外観', '耐摩耗性'],
          applications: ['精密機器', '装飾品', '電子部品'],
          color: 'from-blue-400 to-blue-600',
        },
        {
          title: 'クロムメッキ',
          titleEn: 'Chrome Plating',
          description: '硬度と光沢に優れた、高級感のある表面処理。',
          features: ['高硬度', '鏡面仕上げ', '耐摩耗性'],
          applications: ['自動車部品', '工具', '装飾品'],
          color: 'from-purple-400 to-purple-600',
        },
        {
          title: '銅メッキ',
          titleEn: 'Copper Plating',
          description: '導電性に優れた、電気・電子部品に最適な表面処理。',
          features: ['高導電性', '密着性', '下地処理'],
          applications: ['電子基板', 'コネクタ', '導電部品'],
          color: 'from-orange-400 to-orange-600',
        },
        {
          title: '錫メッキ',
          titleEn: 'Tin Plating',
          description: 'はんだ付け性に優れた、電子部品向けの表面処理。',
          features: ['はんだ付け性', '耐食性', '無毒性'],
          applications: ['電子部品', '食品容器', 'コネクタ'],
          color: 'from-green-400 to-green-600',
        },
        {
          title: '無電解ニッケルメッキ',
          titleEn: 'Electroless Nickel Plating',
          description: '均一な膜厚と高い耐食性を実現する先進的な表面処理。',
          features: ['均一な膜厚', '複雑形状対応', '高耐食性'],
          applications: ['精密部品', '金型', '電子機器'],
          color: 'from-teal-400 to-teal-600',
        },
      ]);
      console.log('✅ Sample services created');
    } else {
      console.log('ℹ️  Services already exist');
    }

    // Create default settings
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create({
        company: {
          name: '有限会社 鷲津メッキ工業所',
          email: 'info@washidu-mekki.com',
          phone: '03-XXXX-XXXX',
          address: '東京都XX区XXXX-XX-XX',
        },
        notifications: {
          newInquiry: true,
          newApplication: true,
          weeklyReport: false,
        },
      });
      console.log('✅ Default settings created');
    } else {
      console.log('ℹ️  Settings already exist');
    }

    // Create sample job positions
    const jobPositionsCount = await JobPosition.countDocuments();
    if (jobPositionsCount === 0) {
      await JobPosition.create([
        {
          title: 'メッキ技術者',
          department: '製造部',
          location: '東京都',
          employmentType: '正社員',
          salary: '月給 25万円〜40万円（経験・能力による）',
          description: '各種メッキ加工の技術者を募集しています。経験者優遇、未経験者も歓迎します。',
          requirements: [
            '高卒以上',
            'メッキ加工の経験（優遇）',
            '製造業での勤務経験',
            '普通自動車免許',
          ],
          responsibilities: [
            'メッキ加工作業',
            '品質管理',
            '設備メンテナンス',
            '作業記録の作成',
          ],
          benefits: [
            '社会保険完備',
            '交通費支給',
            '昇給年1回',
            '賞与年2回',
            '退職金制度',
          ],
          status: '公開',
        },
        {
          title: '品質管理スタッフ',
          department: '品質管理部',
          location: '東京都',
          employmentType: '正社員',
          salary: '月給 23万円〜35万円（経験・能力による）',
          description: 'メッキ製品の品質管理業務を担当していただきます。',
          requirements: [
            '高卒以上',
            '品質管理の経験（優遇）',
            'PCスキル（Excel、Word）',
          ],
          responsibilities: [
            '製品検査',
            '品質データ分析',
            '不良品対応',
            '品質改善提案',
          ],
          benefits: [
            '社会保険完備',
            '交通費支給',
            '昇給年1回',
            '賞与年2回',
          ],
          status: '公開',
        },
        {
          title: '製造補助スタッフ',
          department: '製造部',
          location: '東京都',
          employmentType: 'パート・アルバイト',
          salary: '時給 1,200円〜1,500円',
          description: 'メッキ加工の補助作業を行っていただきます。未経験者歓迎！',
          requirements: [
            '学歴不問',
            '未経験歓迎',
            '体力に自信のある方',
          ],
          responsibilities: [
            '製品の運搬',
            '前処理作業',
            '梱包作業',
            '清掃業務',
          ],
          benefits: [
            '交通費支給',
            '制服貸与',
            '社員登用制度あり',
          ],
          status: '公開',
        },
      ]);
      console.log('✅ Sample job positions created');
    } else {
      console.log('ℹ️  Job positions already exist');
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📝 Admin credentials:');
    console.log('   Email: admin@washidu-mekki.com');
    console.log('   Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();

