interface GalleryItem {
  title_fr: string;
  title_en: string;
  media_url: string;
  category: string;
}

export class LocalDataGallery {
  title_fr: string;
  title_en: string;
  media_url: string;
  category: string;

  constructor({ title_fr, title_en, media_url, category }: GalleryItem) {
    this.title_fr = title_fr;
    this.title_en = title_en;
    this.media_url = media_url;
    this.category = category;
  }
}
