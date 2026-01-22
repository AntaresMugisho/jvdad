'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

interface NewsCardProps {
  id: string;
  titleFr: string;
  titleEn: string;
  summaryFr: string;
  summaryEn: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export function NewsCard({
  id,
  titleFr,
  titleEn,
  summaryFr,
  summaryEn,
  thumbnailUrl,
  publishedAt,
}: NewsCardProps) {
  const { language } = useI18n();
  const title = language === 'fr' ? titleFr : titleEn;
  const summary = language === 'fr' ? summaryFr : summaryEn;
  const locale = language === 'fr' ? fr : enUS;

  return (
    <Link href={`/news/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="pt-4">
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{format(new Date(publishedAt), 'dd MMMM yyyy', { locale })}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {summary}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
