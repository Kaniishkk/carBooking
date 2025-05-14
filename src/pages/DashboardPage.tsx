import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LucideCalendarClock, LucideCheck, LucideX, LucideChevronRight, LucideUser, LucideStar, LucideLogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { bookings, cars } from '../utils/mockData';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');

  // Get bookings for the current user
  const userBookings = bookings.filter(booking => booking.userId === user?.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-700 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-dark-600 rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="relative h-48 bg-primary-600 dark:bg-primary-700">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-primary-600 opacity-90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mt-2">Manage your bookings and account</p>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between px-6 py-4 border-b border-gray-200 dark:border-dark-400">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <LucideUser className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="mt-4 md:mt-0 inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <LucideLogOut className="h-5 w-5 mr-1" />
                Sign out
              </button>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-dark-400">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeTab === 'bookings'
                      ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-dark-400'
                  }`}
                >
                  My Bookings
                </button>
                
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeTab === 'favorites'
                      ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-dark-400'
                  }`}
                >
                  Favorites
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeTab === 'profile'
                      ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-dark-400'
                  }`}
                >
                  Profile Settings
                </button>
              </nav>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {activeTab === 'bookings' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Bookings</h3>
                    <Link
                      to="/cars"
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center"
                    >
                      Browse more cars
                      <LucideChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  {userBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <LucideCalendarClock className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookings yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        You haven't made any car bookings yet.
                      </p>
                      <Link
                        to="/cars"
                        className="btn-primary"
                      >
                        Browse Cars
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userBookings.map((booking) => {
                        const car = cars.find(c => c.id === booking.carId);
                        return (
                          <div
                            key={booking.id}
                            className="bg-gray-50 dark:bg-dark-500 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex flex-col sm:flex-row">
                              <div className="sm:w-1/3 h-48 sm:h-auto">
                                {car && (
                                  <img
                                    src={car.images[0]}
                                    alt={car.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="p-4 sm:p-6 flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                  <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                      {car?.name}
                                    </h4>
                                    <div className="mt-1 flex items-center">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        booking.status === 'confirmed' ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400' :
                                        booking.status === 'completed' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' :
                                        booking.status === 'cancelled' ? 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400' :
                                        'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400'
                                      }`}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 sm:mt-0 text-right">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                    </p>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                      ${booking.totalPrice}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="mt-6 flex items-center justify-between">
                                  <Link
                                    to={`/cars/${car?.id}`}
                                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
                                  >
                                    View car details
                                  </Link>
                                  
                                  {booking.status === 'confirmed' && (
                                    <button
                                      className="btn-secondary text-sm py-1"
                                    >
                                      Cancel Booking
                                    </button>
                                  )}
                                  
                                  {booking.status === 'completed' && (
                                    <button
                                      className="btn-primary text-sm py-1"
                                    >
                                      Leave a Review
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'favorites' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Favorite Cars</h3>
                  </div>
                  
                  <div className="text-center py-12">
                    <LucideStar className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No favorites yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      You haven't added any cars to your favorites yet.
                    </p>
                    <Link
                      to="/cars"
                      className="btn-primary"
                    >
                      Browse Cars
                    </Link>
                  </div>
                </div>
              )}
              
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Settings</h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="full-name"
                          defaultValue={user?.name}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          defaultValue={user?.email}
                          className="input"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Change Password</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="current-password"
                            className="input"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="new-password"
                            className="input"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;