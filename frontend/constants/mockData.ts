import { Property } from '../types/property';

export const SAMPLE_PROPERTY: Property = {
  id: 'prop_12345',
  title: 'Central Flat in Spitalfields - The Flex London',
  location: {
    address: 'Strype Street',
    city: 'London',
    country: 'United Kingdom',
  },
  description: `This apartment is located on Strype Street, a quiet yet convenient spot in the heart of London. It’s a spacious unit with all the essentials you’ll need, including top-quality amenities. The location is ideal, with easy access to transport and nearby shops and cafes. I’ve made sure everything is set up for a comfortable and relaxing stay. 
  
  This 1-bedroom apartment has a king bed and 1 bathroom. The kitchen is fully equipped with top appliances. All duvets and pillows are hypoallergenic, and the bed linen is 100% cotton. The living room is spacious with 2 air mattresses for 2 extra guests. The apartment fits 4 people in total. I’ve made sure everything is ready for a comfortable stay.
            
My goal is to provide you with a remarkable experience, so please let me know if there's any way I can help!
            
When checking in, you'll be asked to show a valid ID and accept our terms and conditions. These steps are designed to ensure a secure and smooth process for everyone. We’re grateful for your understanding!
            
The apartment is located on Strype Street, a quiet and central spot in London. The area is perfect for those who want easy access to the city without the noise. It’s close to transport links, making it easy to get around, and there are plenty of cafes and shops nearby. I love how peaceful it is here while still being close to everything you need.

Devonshire Terrace - 4 minute walk
My Old Place - 1 minute walk 
Liverpool Street Station (Stop F) - 5 minute walk`,
  stats: [
    { iconName: 'Users', label: 'Guests', value: '4' },
    { iconName: 'Bed', label: 'Bedroom', value: '1' },
    { iconName: 'BathIcon', label: 'Bathroom', value: '1' },
    { iconName: 'House', label: 'beds', value: '1' },
  ],
  amenities: [
    { iconName: 'Network', label: 'Internet' },
    { iconName: 'Wifi', label: 'Wireless' },
    { iconName: 'UtensilsCrossed', label: 'Kitchen' },
    { iconName: 'WashingMachine', label: 'Washing Machine' },
    { iconName: 'Wind', label: 'Hair Dryer' },
    { iconName: 'Thermometer', label: 'Heating' },
    { iconName: 'ShieldCheck', label: 'Smoke detector' },
    { iconName: 'ShieldCheck', label: 'Carbon Monoxide Detector' },
    { iconName: 'Bath', label: 'Essentials' },
  ],
  photos: [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop',
    'https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-253094-jmZZ9BY4yl1tAbyV0RxEP0SPv0rT-DaQuQTeafosTGM-68e3bd824b68e',
    'https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-253094-PgQkIe4Mej0vDxxUutRxvCJ4bdKdGpSR5lDXQbOTFuI-68e3be8325de1',
    'https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-253094-EY--fk3cp4TWdymKhH7U5jolWq3hAfBL--LxVeKtS--KD8-68e3bdab42b8b',
    'https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-253094-8pL3c9VdnSM3cX-eHvU-XG5F924mWfFeTKR2B--FdmD0-68e3be957be3e',
    'https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-253094-b3rhpsflPpAOwT--7RCOuohvqS-rognVClqZ-lNkmBQI-68e3bed8a4794',
    // 'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop',
  ],
  host: {
    name: 'sfs',
    isSuperhost: false,
  },
  price: {
    amount: 150,
    currency: 'GBP',
    period: 'night',
  },
  rating: 4.9,
  reviewCount: 124,
};
