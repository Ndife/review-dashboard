export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface Review {
  id: number;
  listingName: string;
  guestName: string;
  content: string;
  rating: number | null;
  categories: ReviewCategory[];
  submittedAt: string | Date;
  type: string;
  isPublic: boolean;
}

export interface PropertyStat {
  icon: React.ElementType;
  label: string;
  value: string;
}

export interface PropertyHeaderProps {
  title: string;
  stats: PropertyStat[];
}
