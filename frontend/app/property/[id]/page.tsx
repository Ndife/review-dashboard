import PropertyListing from '@/components/property/PropertyListing';

import { SAMPLE_PROPERTY } from '@/constants/mockData';

export async function generateMetadata() {
  const property = SAMPLE_PROPERTY;

  return {
    title: `${property.title} | The Flex`,
    description: property.description.slice(0, 160), // standard meta description length
    openGraph: {
      title: `${property.title} | The Flex`,
      description: property.description.slice(0, 160),
      images: [property.photos[0]],
    },
  };
}

export default function Page() {
  return <PropertyListing />;
}
