import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideStar, LucideUsers, LucideCalendar, LucideGaugeCircle, LucideGauge as LucideGasTank, LucideCheckCircle, LucideChevronLeft, LucideChevronRight, LucideHeart } from 'lucide-react';
import { cars, type Car } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../utils/cn';

const CarDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simulate API call to get car details
    const fetchCar = () => {
      setLoading(true);
      setTimeout(() => {
        const foundCar = cars.find(c => c.id === id);
        setCar(foundCar || null);
        setLoading(false);
      }, 500);
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-700">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-300 dark:bg-dark-500 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-dark-500 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-dark-500 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-700 p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Car Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">The car you are looking for does not exist or has been removed.</p>
        <Link to="/cars" className="btn-primary">
          Browse Other Cars
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-700 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <LucideChevronLeft className="h-5 w-5 mr-1" />
            Back to cars
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-dark-600 rounded-xl overflow-hidden shadow-md"
          >
            <div className="relative h-64 sm:h-80 md:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                {car.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === activeImageIndex ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 ${index === activeImageIndex ? 'block' : 'hidden'}`}
                  >
                    <img 
                      src={image} 
                      alt={`${car.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors focus:outline-none"
                aria-label="Previous image"
              >
                <LucideChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors focus:outline-none"
                aria-label="Next image"
              >
                <LucideChevronRight className="h-6 w-6" />
              </button>
              
              {/* Pagination dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {car.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      index === activeImageIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/80"
                    )}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex p-4 space-x-2 overflow-x-auto">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={cn(
                    "flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all",
                    index === activeImageIndex 
                      ? "border-primary-600 dark:border-primary-400" 
                      : "border-transparent hover:border-gray-300 dark:hover:border-dark-400"
                  )}
                >
                  <img 
                    src={image} 
                    alt={`${car.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Car Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {car.name}
                </h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <LucideStar className="h-5 w-5 text-yellow-500" />
                    <span className="ml-1 text-gray-700 dark:text-gray-300">{car.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{car.brand}</span>
                  <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{car.year}</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isFavorite 
                    ? "text-red-500 bg-red-50 dark:bg-red-900/20" 
                    : "text-gray-400 hover:text-red-500 bg-gray-100 dark:bg-dark-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                )}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <LucideHeart className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
            
            {/* Price */}
            <div className="mt-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">${car.price}</span>
                  <span className="text-gray-600 dark:text-gray-400"> / day</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${car.available ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400' : 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400'}`}>
                  {car.available ? 'Available' : 'Currently Booked'}
                </div>
              </div>
            </div>
            
            {/* Specs */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-dark-600 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <LucideUsers className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{car.seats} Seats</span>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-600 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <LucideGaugeCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{car.transmission}</span>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-600 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <LucideGasTank className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{car.fuelType}</span>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-600 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <LucideCalendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{car.year}</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Description</h2>
              <p className="text-gray-700 dark:text-gray-300">
                {car.description}
              </p>
            </div>
            
            {/* Features */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <LucideCheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            {car.available ? (
              <div className="mt-8">
                {isAuthenticated ? (
                  <button
                    onClick={() => navigate(`/booking/${car.id}`)}
                    className="w-full btn-primary py-3 text-lg font-medium"
                  >
                    Book Now
                  </button>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      state={{ redirectTo: `/booking/${car.id}` }}
                      className="w-full btn-primary py-3 text-lg font-medium block text-center"
                    >
                      Login to Book
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline">
                        Register now
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8">
                <div className="w-full bg-gray-200 dark:bg-dark-500 py-3 text-lg font-medium text-center text-gray-700 dark:text-gray-300 rounded-lg cursor-not-allowed">
                  Currently Unavailable
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                  This car is currently booked. Please check back later or browse other available cars.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;