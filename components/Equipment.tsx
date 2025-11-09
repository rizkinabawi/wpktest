"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEquipment } from "@/lib/hooks/useApi";
import { ChevronLeft, ChevronRight, Tag, Info, Factory, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Equipment() {
  const { data, isLoading } = useEquipment();
  const equipments = data?.items || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!equipments || equipments.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-500">
        設備データはまだありません
      </div>
    );
  }

  const paginate = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    if (currentIndex > 0) paginate(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < equipments.length - 1) paginate(currentIndex + 1);
  };

  const equipment = equipments[currentIndex];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          設備管理
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          設備・機械の詳細情報を確認できます。
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto h-[600px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={equipment._id}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <Card className="relative h-full overflow-hidden border-none bg-transparent">
              {/* Background image */}
              {equipment.image && (
                <div className="absolute inset-0">
                  <Image
                    src={equipment.image}
                    alt={equipment.name}
                    fill
                    className="object-cover"
                  />
                  {/* Hanya setengah bawah blur */}
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-900/80 via-slate-800/70 to-transparent backdrop-blur-sm" />
                </div>
              )}

              {/* Content bottom half */}
              <CardContent className="absolute bottom-0 z-10 w-full h-1/2 p-6 flex flex-col justify-start text-white">
                <h2 className="text-2xl font-bold mb-1">{equipment.name}</h2>
                <p className="text-lg mb-3">{equipment.nameEn}</p>

                <div className="flex flex-col gap-2 text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{equipment.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    <span>{equipment.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4" />
                    <span>{equipment.manufacturer} / {equipment.model}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{equipment.yearInstalled}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-100 line-clamp-3 mb-2">
                  {equipment.description}
                </p>

                {equipment.specifications?.length > 0 && (
                  <ul className="list-disc pl-5 text-xs text-slate-200 line-clamp-2">
                    {equipment.specifications.map((spec: string, i: number) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Slide buttons */}
        <div className="absolute inset-y-0 flex items-center justify-between w-full px-4 z-20">
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            variant="outline"
            size="sm"
            className="bg-black/30 hover:bg-black/50 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === equipments.length - 1}
            variant="outline"
            size="sm"
            className="bg-black/30 hover:bg-black/50 text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Page indicator */}
        <div className="absolute bottom-4 w-full text-center text-slate-300 font-semibold z-20">
          {currentIndex + 1} / {equipments.length}
        </div>
      </div>
    </section>
  );
}
