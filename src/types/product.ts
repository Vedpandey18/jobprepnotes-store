export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  category: string;
  price: number;
  discountPrice: number | null;
  discountPercent: number | null;
  pdfUrl: string;
  bundlePdfUrls?: string[];
  badge?: string;
};
