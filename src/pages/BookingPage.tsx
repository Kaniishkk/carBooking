import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideCalendar, LucideUser, LucidePhone, LucideMapPin, LucideCreditCard, LucideCheck } from 'lucide-react';
import { cars, type Car } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Form fields
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  
  // Calculate booking details
  const [days, setDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Simulate API call to get car details
    const fetchCar = () => {
      setLoading(true);
      setTimeout(() => {
        const foundCar = cars.find(c => c.id === id);
        setCar(foundCar || null);
        setLoading(false);
        
        if (foundCar) {
          setTotalPrice(foundCar.price);
        }
      }, 500);
    };

    fetchCar();
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      
      setDays(diffDays);
      setTotalPrice(car.price * diffDays);
    }
  }, [startDate, endDate, car]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    
    // Ensure end date is after start date
    if (endDate && new Date(newStartDate) > new Date(endDate)) {
      setEndDate(newStartDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    
    // Ensure start date is before end date
    if (startDate && new Date(newEndDate) < new Date(startDate)) {
      setStartDate(newEndDate);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would submit this data to your backend
    // For now, we'll just simulate a successful booking
    setBookingSuccess(true);
    
    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const handlePrevStep = () => {
    setFormStep(prev => Math.max(prev - 1, 1));
  };

  const handleNextStep = () => {
    setFormStep(prev => Math.min(prev + 1, 3));
  };

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
        <p className="text-gray-600 dark:text-gray-300 mb-8">The car you are trying to book does not exist or has been removed.</p>
        <button onClick={() => navigate('/cars')} className="btn-primary">
          Browse Cars
        </button>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-dark-600 rounded-xl shadow-lg p-8 text-center"
          >
            <div className="rounded-full bg-success-100 dark:bg-success-900/30 p-4 mx-auto w-24 h-24 flex items-center justify-center mb-6">
              <LucideCheck className="h-12 w-12 text-success-600 dark:text-success-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Booking Confirmed!
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your booking for the {car.name} has been successfully confirmed. You will receive a confirmation email shortly.
            </p>
            
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to dashboard...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-dark-600 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Book Your {car.name}
            </h1>
            
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium ${formStep >= 1 ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-dark-400'}`}>
                    1
                  </div>
                  <span className="text-sm mt-2 text-gray-600 dark:text-gray-300">Dates</span>
                </div>
                
                <div className={`flex-1 h-1 mx-4 ${formStep >= 2 ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-dark-400'}`}></div>
                
                <div className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium ${formStep >= 2 ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-dark-400'}`}>
                    2
                  </div>
                  <span className="text-sm mt-2 text-gray-600 dark:text-gray-300">Details</span>
                </div>
                
                <div className={`flex-1 h-1 mx-4 ${formStep >= 3 ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-dark-400'}`}></div>
                
                <div className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium ${formStep >= 3 ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 dark:bg-dark-400'}`}>
                    3
                  </div>
                  <span className="text-sm mt-2 text-gray-600 dark:text-gray-300">Payment</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleBookingSubmit}>
              {/* Step 1: Date Selection */}
              {formStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <LucideCalendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Pickup Date
                        </label>
                      </div>
                      <input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <LucideCalendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Return Date
                        </label>
                      </div>
                      <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        required
                        className="input"
                      />
                    </div>
                  </div>
                  
                  {startDate && endDate && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-500 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Booking Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Vehicle:</span>
                          <span className="text-gray-900 dark:text-white font-medium">{car.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Daily Rate:</span>
                          <span className="text-gray-900 dark:text-white font-medium">${car.price}/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                          <span className="text-gray-900 dark:text-white font-medium">{days} day{days !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-dark-400">
                          <span className="text-gray-800 dark:text-gray-200 font-medium">Total:</span>
                          <span className="text-gray-900 dark:text-white font-bold">${totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
              
              {/* Step 2: Personal Details */}
              {formStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <LucideUser className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name
                        </label>
                      </div>
                      <input
                        type="text"
                        id="full-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <LucideUser className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address
                        </label>
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <LucidePhone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number
                        </label>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="input"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <LucideMapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Pickup Address
                        </label>
                      </div>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="input"
                        placeholder="123 Main St, City"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Payment */}
              {formStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Payment Method
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center p-4 border border-gray-200 dark:border-dark-400 rounded-lg">
                        <input
                          id="payment-credit"
                          name="payment-method"
                          type="radio"
                          value="credit"
                          checked={paymentMethod === 'credit'}
                          onChange={() => setPaymentMethod('credit')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="payment-credit" className="ml-3 flex items-center cursor-pointer">
                          <LucideCreditCard className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">Credit / Debit Card</span>
                        </label>
                      </div>
                      
                      <div className="flex items-center p-4 border border-gray-200 dark:border-dark-400 rounded-lg">
                        <input
                          id="payment-paypal"
                          name="payment-method"
                          type="radio"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="payment-paypal" className="ml-3 flex items-center cursor-pointer">
                          <span className="text-gray-700 dark:text-gray-300">PayPal</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* For demo purposes, we'll skip actual payment form fields */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-500 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Final Booking Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Vehicle:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{car.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Pickup Date:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Return Date:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{days} day{days !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Daily Rate:</span>
                        <span className="text-gray-900 dark:text-white font-medium">${car.price}/day</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-dark-400">
                        <span className="text-gray-800 dark:text-gray-200 font-medium">Total Amount:</span>
                        <span className="text-gray-900 dark:text-white font-bold">${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div className="mt-8 flex justify-between">
                {formStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate(`/cars/${car.id}`)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                )}
                
                {formStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={formStep === 1 && (!startDate || !endDate)}
                    className={`btn-primary ${formStep === 1 && (!startDate || !endDate) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;