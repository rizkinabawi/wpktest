'use client'
import { useHomepageSections } from "@/lib/hooks/useApi";
import { motion } from "motion/react";
import { Skeleton } from "./ui/skeleton";
import { MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Company() {
  const { data, isLoading } = useHomepageSections({ visible: true });
  const section = data?.items?.find((s: any) => s.sectionId === "company");
  const content = section?.content || {};
  const info = content.companyInfo || {};

  if (isLoading) return <Skeleton className="h-[400px]" />;

  return (
    <section id="company" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6">
            会社概要 / COMPANY
          </span>
          <h2 className="text-slate-900 dark:text-white mb-4">{info.name}</h2>
          <p className="text-slate-600 dark:text-slate-400">{info.address}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="text-blue-500" />
                <p>{info.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-blue-500" />
                <p>{info.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-500" />
                <p>{info.address}</p>
              </div>
            </CardContent>
          </Card>

          {content.mapImage && (
            <ImageWithFallback
              src={content.mapImage}
              alt="Company map"
              className="w-full h-[400px] object-cover rounded-xl"
            />
          )}
        </div>
      </div>
    </section>
  );
}
