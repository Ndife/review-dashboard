export interface Amenity {
  iconName: string; // Storing icon name as string for serializability, will map to component
  label: string;
}

export interface PropertyStat {
  iconName: string;
  label: string;
  value: string;
}

export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface Review {
  // Assuming existing Review interface structure from types/index.ts, copying relevant parts or importing if possible.
  // Ideally we consolidate, but for this file's standalone correctness:
  id?: string;
  userName: string;
  avatarUrl?: string;
  rating: number;
  date: string;
  comment: string;
  categories?: ReviewCategory[];
}

export interface Property {
  id: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  stats: PropertyStat[];
  amenities: Amenity[];
  host: {
    name: string;
    isSuperhost: boolean;
    image?: string;
  };
  photos: string[];
  price: {
    amount: number;
    currency: string;
    period: string;
  };
  rating: number;
  reviewCount: number;
}
