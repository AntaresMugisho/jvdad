'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

interface ProjectCardProps {
  id: string;
  titleFr: string;
  titleEn: string;
  shortDescriptionFr: string;
  shortDescriptionEn: string;
  domain: string;
  location: string;
  thumbnailUrl: string;
}

export function ProjectCard({
  id,
  titleFr,
  titleEn,
  shortDescriptionFr,
  shortDescriptionEn,
  domain,
  location,
  thumbnailUrl,
}: ProjectCardProps) {
  const { language } = useI18n();
  const title = language === 'fr' ? titleFr : titleEn;
  const description = language === 'fr' ? shortDescriptionFr : shortDescriptionEn;

  return (
    <Link href={`/projects/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 right-3 bg-green-600">
            {domain}
          </Badge>
        </div>
        <CardContent className="pt-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {description}
          </p>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
