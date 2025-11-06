export async function register() {
  const { registerOTel } = await import('@vercel/otel');
  registerOTel('company-app'); // ubah sesuai nama project kamu

  // Import manual semua model
  const Application = await import('./lib/models/Application');
  const Company = await import('./lib/models/Company');
  const Equipment = await import('./lib/models/Equipment');
  const Event = await import('./lib/models/Event');
  const HomepageSection = await import('./lib/models/HomepageSection');
  const Inquiry = await import('./lib/models/Inquiry');
  const JobPosition = await import('./lib/models/JobPosition');
  const News = await import('./lib/models/News');
  const SampleProduct = await import('./lib/models/SampleProduct');
  const Service = await import('./lib/models/Service');
  const Settings = await import('./lib/models/Settings');
  const User = await import('./lib/models/User');

  console.log('Models loaded:', {
    Application,
    Company,
    Equipment,
    Event,
    HomepageSection,
    Inquiry,
    JobPosition,
    News,
    SampleProduct,
    Service,
    Settings,
    User,
  });
}
