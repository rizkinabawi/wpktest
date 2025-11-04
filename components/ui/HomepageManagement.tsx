'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload, MultipleImageUpload } from '@/components/ui/image-upload';
import { useHomepageSections, useUpdateAllHomepageSections } from '@/lib/hooks/useApi';
import { Loader2, Save, Trash2 } from 'lucide-react';
import { IHomepageSection } from '@/lib/models/HomepageSection';
import { Switch } from '@/components/ui/switch';

const HeroSectionEditor = ({ section, onSectionChange }) => {
  const handleContentChange = (field, value) => {
    onSectionChange({ ...section, content: { ...section.content, [field]: value } });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-slate-300 mb-2">Heading</label>
        <Input value={section.content.heading || ''} onChange={(e) => handleContentChange('heading', e.target.value)} className="bg-slate-900 border-slate-600 text-white" />
      </div>
      <div>
        <label className="block text-slate-300 mb-2">Subheading</label>
        <Input value={section.content.subheading || ''} onChange={(e) => handleContentChange('subheading', e.target.value)} className="bg-slate-900 border-slate-600 text-white" />
      </div>
      <div>
        <label className="block text-slate-300 mb-2">Description</label>
        <Textarea value={section.content.description || ''} onChange={(e) => handleContentChange('description', e.target.value)} className="bg-slate-900 border-slate-600 text-white" rows={3} />
      </div>
      <div>
        <label className="block text-slate-300 mb-2">Background Image</label>
        <ImageUpload value={section.content.image || ''} onChange={(url) => handleContentChange('image', url)} folder="homepage" />
      </div>
    </div>
  );
};

const AboutSectionEditor = ({ section, onSectionChange }) => {
  const handleStatChange = (index, field, value) => {
    const newStats = [...(section.content.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    onSectionChange({ ...section, content: { ...section.content, stats: newStats } });
  };

  return (
    <div className="space-y-4">
      {(section.content.stats || []).map((stat, index) => (
        <div key={index} className="flex items-center gap-4 p-4 border border-slate-700 rounded-lg">
          <Input placeholder="Value (e.g., 3,000+)" value={stat.value} onChange={(e) => handleStatChange(index, 'value', e.target.value)} className="bg-slate-900" />
          <Input placeholder="Label (e.g., Projects)" value={stat.label} onChange={(e) => handleStatChange(index, 'label', e.target.value)} className="bg-slate-900" />
        </div>
      ))}
    </div>
  );
};

const DefaultSectionEditor = ({ section, onSectionChange }) => (
  <div className="space-y-4">
     <div>
        <label className="block text-slate-300 mb-2">Title</label>
        <Input value={section.title} onChange={(e) => onSectionChange({ ...section, title: e.target.value })} className="bg-slate-900 border-slate-600 text-white" />
      </div>
  </div>
 
);

const SectionEditor = ({ section, onSectionChange }) => {
  const editors = {
    hero: <HeroSectionEditor section={section} onSectionChange={onSectionChange} />,
    about: <AboutSectionEditor section={section} onSectionChange={onSectionChange} />,
    default: <DefaultSectionEditor section={section} onSectionChange={onSectionChange} />,
  };

  return editors[section.sectionId] || editors.default;
};

export default function HomepageManagement() {
  const { data: sectionsData, isLoading } = useHomepageSections();
  const updateSections = useUpdateAllHomepageSections();
  const [sections, setSections] = useState<IHomepageSection[]>([]);

  useEffect(() => {
    if (sectionsData?.items) {
      const sorted = sectionsData.items.sort((a, b) => a.order - b.order);
      setSections(sorted);
    }
  }, [sectionsData]);

  const handleSectionChange = (index: number, newSection: IHomepageSection) => {
    const newSections = [...sections];
    newSections[index] = newSection;
    setSections(newSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSections.mutateAsync({ sections });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-3xl mb-2">Homepage Management</h1>
          <p className="text-slate-400">Edit the content of each section of the homepage.</p>
        </div>
        <Button onClick={handleSubmit} disabled={updateSections.isPending} className="bg-blue-600 hover:bg-blue-700">
          {updateSections.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {sections.map((section, index) => (
          <Card key={section._id} className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white capitalize">{section.sectionId}</CardTitle>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">Visible</span>
                <Switch
                  checked={section.isVisible}
                  onCheckedChange={(checked) => handleSectionChange(index, { ...section, isVisible: checked })}
                />
              </div>
            </CardHeader>
            <CardContent>
              <SectionEditor section={section} onSectionChange={(newSection) => handleSectionChange(index, newSection)} />
            </CardContent>
          </Card>
        ))}
      </form>
    </div>
  );
}
