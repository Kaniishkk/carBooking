export type Car = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  price: number;
  images: string[];
  rating: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: string;
  features: string[];
  description: string;
  available: boolean;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: 'luxury',
    name: 'Luxury',
    icon: 'crown',
    description: 'Premium vehicles with exceptional comfort and style'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'timer',
    description: 'High-performance cars built for speed and handling'
  },
  {
    id: 'suv',
    name: 'SUV',
    icon: 'mountain',
    description: 'Spacious vehicles with off-road capabilities'
  },
  {
    id: 'electric',
    name: 'Electric',
    icon: 'zap',
    description: 'Eco-friendly vehicles with zero emissions'
  },
  {
    id: 'convertible',
    name: 'Convertible',
    icon: 'wind',
    description: 'Open-top vehicles for the ultimate driving experience'
  },
  {
    id: 'economy',
    name: 'Economy',
    icon: 'piggy-bank',
    description: 'Fuel-efficient and budget-friendly options'
  }
];

export const cars: Car[] = [
  {
    id: 'car-1',
    name: 'Mercedes-Benz S-Class',
    brand: 'Mercedes-Benz',
    model: 'S 580',
    year: 2023,
    category: 'luxury',
    price: 250,
    images: [
      'https://images.pexels.com/photos/1009871/pexels-photo-1009871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3778769/pexels-photo-3778769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.9,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    features: [
      'Heated Seats',
      'Panoramic Sunroof',
      'Premium Sound System',
      'Advanced Driver Assistance',
      'Leather Interior'
    ],
    description: 'The Mercedes-Benz S-Class stands as the pinnacle of luxury sedans, offering unparalleled comfort, cutting-edge technology, and exceptional performance. Experience the ultimate in automotive sophistication with this flagship sedan.',
    available: true
  },
  {
    id: 'car-2',
    name: 'BMW 7 Series',
    brand: 'BMW',
    model: '740i',
    year: 2023,
    category: 'luxury',
    price: 230,
    images: [
      'https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.8,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    features: [
      'Executive Lounge Seating',
      'Ambient Lighting',
      'Gesture Control',
      'Harman/Kardon Audio',
      'Air Suspension'
    ],
    description: 'The BMW 7 Series delivers a perfect blend of luxury and driving dynamics. With its innovative technology, spacious interior, and commanding presence, this executive sedan provides a first-class travel experience on every journey.',
    available: true
  },
  {
    id: 'car-3',
    name: 'Ferrari 488 GTB',
    brand: 'Ferrari',
    model: '488 GTB',
    year: 2022,
    category: 'sports',
    price: 1200,
    images: [
      'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 5.0,
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    features: [
      'Twin-Turbocharged V8 Engine',
      'Carbon Fiber Components',
      'Race-Inspired Interior',
      'Adaptive Suspension',
      'Launch Control'
    ],
    description: 'Experience the thrill of Italian engineering with the Ferrari 488 GTB. This mid-engine masterpiece delivers breathtaking performance, razor-sharp handling, and a visceral driving experience that embodies the essence of Ferrari.',
    available: true
  },
  {
    id: 'car-4',
    name: 'Porsche 911 Turbo S',
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2023,
    category: 'sports',
    price: 950,
    images: [
      'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.9,
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    features: [
      'Twin-Turbocharged Flat-Six Engine',
      'All-Wheel Drive',
      'Sport Chrono Package',
      'Adaptive Sports Seats',
      'Burmester Audio System'
    ],
    description: 'The Porsche 911 Turbo S represents the perfect balance of everyday usability and extreme performance. With its iconic design, precision engineering, and exhilarating power, this sports car delivers an unmatched driving experience.',
    available: false
  },
  {
    id: 'car-5',
    name: 'Range Rover Autobiography',
    brand: 'Land Rover',
    model: 'Range Rover Autobiography',
    year: 2023,
    category: 'suv',
    price: 320,
    images: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/13251743/pexels-photo-13251743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.8,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    features: [
      'Semi-Aniline Leather Seats',
      'Executive Class Comfort',
      'All-Terrain Progress Control',
      'Meridian Signature Sound System',
      'Advanced Air Purification'
    ],
    description: 'The Range Rover Autobiography represents the pinnacle of luxury SUVs, combining opulent comfort with genuine off-road capability. Experience first-class travel whether navigating urban environments or venturing off the beaten path.',
    available: true
  },
  {
    id: 'car-6',
    name: 'Tesla Model S Plaid',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2023,
    category: 'electric',
    price: 375,
    images: [
      'https://images.pexels.com/photos/12861591/pexels-photo-12861591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11517830/pexels-photo-11517830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.9,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Electric',
    features: [
      'Tri-Motor All-Wheel Drive',
      'Autopilot Capability',
      'Gaming-Level Interior Computing',
      '17" Touchscreen Display',
      'Glass Roof'
    ],
    description: 'The Tesla Model S Plaid is the fastest accelerating production car ever made, combining ludicrous performance with cutting-edge technology and zero emissions. Experience the future of automotive engineering and sustainable luxury.',
    available: true
  },
  {
    id: 'car-7',
    name: 'Lamborghini Urus',
    brand: 'Lamborghini',
    model: 'Urus',
    year: 2023,
    category: 'suv',
    price: 850,
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/10905606/pexels-photo-10905606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.9,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    features: [
      'Twin-Turbo V8 Engine',
      'Adaptive Air Suspension',
      'Carbon Ceramic Brakes',
      'Alcantara Interior',
      'Multiple Driving Modes'
    ],
    description: 'The Lamborghini Urus redefines the SUV segment with its supercar DNA and practical versatility. Experience unprecedented performance, aggressive styling, and Italian craftsmanship in this groundbreaking super SUV.',
    available: true
  },
  {
    id: 'car-8',
    name: 'Bentley Continental GT',
    brand: 'Bentley',
    model: 'Continental GT',
    year: 2023,
    category: 'luxury',
    price: 620,
    images: [
      'https://images.pexels.com/photos/3972750/pexels-photo-3972750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3972750/pexels-photo-3972750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    rating: 4.8,
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    features: [
      'Handcrafted Interior',
      'Rotating Dashboard Display',
      'Naim Audio System',
      'Active All-Wheel Drive',
      'Dynamic Ride System'
    ],
    description: 'The Bentley Continental GT exemplifies grand touring excellence with its perfect blend of performance, luxury, and craftsmanship. Experience unparalleled comfort and capability in this meticulously crafted British masterpiece.',
    available: true
  }
];

export type Booking = {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  createdAt: string;
};

export const bookings: Booking[] = [
  {
    id: 'booking-1',
    carId: 'car-1',
    userId: 'user-1',
    startDate: '2023-12-10',
    endDate: '2023-12-12',
    status: 'confirmed',
    totalPrice: 750,
    createdAt: '2023-12-01T10:30:00Z'
  },
  {
    id: 'booking-2',
    carId: 'car-3',
    userId: 'user-1',
    startDate: '2023-11-05',
    endDate: '2023-11-06',
    status: 'completed',
    totalPrice: 1200,
    createdAt: '2023-10-25T14:15:00Z'
  }
];