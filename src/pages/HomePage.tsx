import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LucideArrowRight, LucideCheck, LucideStar, LucideShield, LucideClock } from 'lucide-react';
import { categories, cars } from '../utils/mockData';

const HomePage: React.FC = () => {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-cover bg-center bg-hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-dark-700/50" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Luxury Driving Experience
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover our premium collection of high-end vehicles for rent. Drive the car of your dreams today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/cars"
                className="btn-primary text-lg py-3 px-8"
              >
                Browse Cars
              </Link>
              <Link
                to="/register"
                className="btn-secondary text-lg py-3 px-8"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-3 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Why Choose LuxeAuto
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              We offer a premium car rental experience with unmatched service and selection
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<LucideStar className="w-12 h-12 text-primary-500" />}
              title="Premium Selection"
              description="Access to the world's finest luxury and exotic vehicles, meticulously maintained for your driving pleasure."
            />
            <FeatureCard 
              icon={<LucideShield className="w-12 h-12 text-primary-500" />}
              title="Fully Insured"
              description="Comprehensive insurance coverage included with every rental for your peace of mind."
            />
            <FeatureCard 
              icon={<LucideClock className="w-12 h-12 text-primary-500" />}
              title="Flexible Rentals"
              description="From a few hours to several weeks, we accommodate your schedule with flexible booking options."
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Browse by Category
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Explore our diverse range of vehicles to find your perfect match
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={`/cars?category=${category.id}`}
                  className="block group"
                >
                  <div className="bg-white dark:bg-dark-500 rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary-600 dark:text-primary-400 text-2xl">{category.icon}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-white dark:bg-dark-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between max-w-7xl mx-auto mb-12"
          >
            <div>
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Featured Vehicles
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 dark:text-gray-300"
              >
                Explore our most popular luxury rentals
              </motion.p>
            </div>
            <motion.div variants={fadeInUp}>
              <Link 
                to="/cars" 
                className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 mt-4 md:mt-0"
              >
                View all cars
                <LucideArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.slice(0, 4).map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={`/cars/${car.id}`}
                  className="block group card card-hover h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={car.images[0]} 
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-bl-lg">
                      ${car.price}/day
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{car.name}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <span>{car.year} • {car.transmission}</span>
                      <div className="flex items-center">
                        <LucideStar className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{car.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">{car.category}</span>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${car.available ? 'bg-success-100 text-success-700' : 'bg-error-100 text-error-700'}`}>
                        {car.available ? 'Available' : 'Booked'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Hear from our satisfied customers about their luxury rental experience
            </motion.p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white dark:bg-dark-500 rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <span className="absolute -left-4 -top-4 text-6xl text-primary-300">"</span>
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6 relative z-10">
                    My experience with LuxeAuto was absolutely phenomenal. From the moment I browsed their collection online to the day I returned the vehicle, every interaction was marked by professionalism and luxury. The Ferrari 488 GTB exceeded all my expectations—it was immaculately maintained and delivered an unforgettable driving experience.
                  </p>
                  <span className="absolute -right-4 bottom-0 text-6xl text-primary-300">"</span>
                </div>
                <div className="mt-8">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-white dark:border-dark-400 shadow-md mx-auto">
                    <img 
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Client portrait"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">James Wilson</h4>
                    <p className="text-gray-600 dark:text-gray-400">Executive Director</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Experience Luxury?</h2>
            <p className="text-xl text-primary-100 mb-10">
              Join our exclusive membership for priority bookings and special offers.
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-primary-600 hover:bg-gray-100 text-lg font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ 
  icon, 
  title, 
  description 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-dark-500 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default HomePage;