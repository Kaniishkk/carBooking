import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { cars, categories, type Car } from '../utils/mockData';
import { LucideStar, LucideFilter, LucideSliders, LucideX, LucideChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

const CarsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('recommended');
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Use URL params to set initial filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  // Apply filters
  useEffect(() => {
    let result = [...cars];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car => 
        car.name.toLowerCase().includes(query) || 
        car.brand.toLowerCase().includes(query) || 
        car.model.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(car => car.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter(car => 
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );

    // Sort results
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'recommended':
      default:
        // Default sorting (could be a weighted combination of factors)
        break;
    }

    setFilteredCars(result);
    setFiltersApplied(
      !!searchQuery || 
      !!selectedCategory || 
      priceRange[0] > 0 || 
      priceRange[1] < 1500 ||
      sortOption !== 'recommended'
    );
  }, [searchQuery, selectedCategory, priceRange, sortOption]);

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 1500]);
    setSearchQuery('');
    setSortOption('recommended');
    navigate('/cars');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-700 pb-16">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-dark-600 py-12 px-4 sm:px-6 lg:px-8 shadow-sm"
      >
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
              Explore Our Premium Vehicles
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Choose from our exclusive collection of luxury cars for your next adventure
            </p>
          </div>
        </div>
      </motion.div>

      {/* Categories chips */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-nowrap overflow-x-auto pb-2 space-x-2 md:justify-center">
          <button
            onClick={() => {
              setSelectedCategory('');
              navigate('/cars');
            }}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all",
              !selectedCategory
                ? "bg-primary-600 text-white"
                : "bg-white dark:bg-dark-500 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-400"
            )}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                navigate(`/cars?category=${category.id}`);
              }}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all",
                selectedCategory === category.id
                  ? "bg-primary-600 text-white"
                  : "bg-white dark:bg-dark-500 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-400"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white dark:bg-dark-600 rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
                {filtersApplied && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Brand, model, etc."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input"
                  />
                </div>
                
                {/* Price Range */}
                <div>
                  <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range ($/day)
                  </label>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-gray-700 dark:text-gray-300">${priceRange[0]}</span>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      step="50"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">${priceRange[1]}</span>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          id={`category-${category.id}`}
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => {
                            setSelectedCategory(category.id);
                            navigate(`/cars?category=${category.id}`);
                          }}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Filters */}
            <div className="block lg:hidden mb-6">
              <div className="flex justify-between">
                <button 
                  onClick={() => setIsFiltersOpen(true)}
                  className="btn-secondary"
                >
                  <LucideFilter className="mr-2 h-5 w-5" />
                  Filters
                </button>
                
                {/* Sort Dropdown - Mobile */}
                <SortDropdown value={sortOption} onChange={setSortOption} />
              </div>
              
              {/* Applied filters tags */}
              {filtersApplied && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCategory && (
                    <FilterTag 
                      label={`Category: ${categories.find(c => c.id === selectedCategory)?.name}`} 
                      onRemove={() => setSelectedCategory('')}
                    />
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 1500) && (
                    <FilterTag 
                      label={`Price: $${priceRange[0]}-$${priceRange[1]}`} 
                      onRemove={() => setPriceRange([0, 1500])}
                    />
                  )}
                  {searchQuery && (
                    <FilterTag 
                      label={`Search: ${searchQuery}`} 
                      onRemove={() => setSearchQuery('')}
                    />
                  )}
                  {sortOption !== 'recommended' && (
                    <FilterTag 
                      label={`Sort: ${getSortLabel(sortOption)}`} 
                      onRemove={() => setSortOption('recommended')}
                    />
                  )}
                </div>
              )}
            </div>
            
            {/* Results header - Desktop */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{filteredCars.length}</span> vehicles
              </p>
              
              {/* Sort Dropdown - Desktop */}
              <SortDropdown value={sortOption} onChange={setSortOption} />
            </div>
            
            {/* Results grid */}
            {filteredCars.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredCars.map((car) => (
                    <motion.div
                      key={car.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="card card-hover"
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
                        <button 
                          onClick={() => navigate(`/cars/${car.id}`)}
                          className="mt-4 w-full btn-primary"
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white dark:bg-dark-600 rounded-xl shadow p-8 text-center">
                <div className="flex flex-col items-center">
                  <LucideSliders className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No cars found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your filters or search criteria.
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex lg:hidden"
            onClick={() => setIsFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="ml-auto w-full max-w-xs bg-white dark:bg-dark-600 h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
                  <button 
                    onClick={() => setIsFiltersOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <LucideX className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label htmlFor="mobile-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Search
                    </label>
                    <input
                      type="text"
                      id="mobile-search"
                      placeholder="Brand, model, etc."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input"
                    />
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <label htmlFor="mobile-price-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price Range ($/day)
                    </label>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-gray-700 dark:text-gray-300">${priceRange[0]}</span>
                      <input
                        type="range"
                        min="0"
                        max="1500"
                        step="50"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-700 dark:text-gray-300">${priceRange[1]}</span>
                      <input
                        type="range"
                        min="0"
                        max="1500"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <input
                            id={`mobile-category-${category.id}`}
                            type="radio"
                            name="mobile-category"
                            checked={selectedCategory === category.id}
                            onChange={() => setSelectedCategory(category.id)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`mobile-category-${category.id}`}
                            className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <button 
                    onClick={() => {
                      setIsFiltersOpen(false);
                    }}
                    className="w-full btn-primary"
                  >
                    Apply Filters
                  </button>
                  
                  {filtersApplied && (
                    <button 
                      onClick={() => {
                        clearFilters();
                        setIsFiltersOpen(false);
                      }}
                      className="w-full btn-secondary"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Sort Dropdown component
const SortDropdown: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary flex items-center"
      >
        <span>Sort: {getSortLabel(value)}</span>
        <LucideChevronDown className="ml-2 h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-dark-500 ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {[
              { id: 'recommended', label: 'Recommended' },
              { id: 'price-low', label: 'Price: Low to High' },
              { id: 'price-high', label: 'Price: High to Low' },
              { id: 'rating', label: 'Highest Rated' },
              { id: 'newest', label: 'Newest Models' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "block w-full text-left px-4 py-2 text-sm",
                  value === option.id
                    ? "bg-gray-100 dark:bg-dark-400 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-500"
                )}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Filter Tag component
const FilterTag: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => {
  return (
    <div className="inline-flex items-center bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full py-1 pl-3 pr-1">
      <span className="text-sm">{label}</span>
      <button 
        onClick={onRemove} 
        className="ml-1 p-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800"
      >
        <LucideX className="h-3 w-3" />
      </button>
    </div>
  );
};

// Helper function to get sort option label
function getSortLabel(sortOption: string): string {
  switch (sortOption) {
    case 'price-low':
      return 'Price: Low to High';
    case 'price-high':
      return 'Price: High to Low';
    case 'rating':
      return 'Highest Rated';
    case 'newest':
      return 'Newest Models';
    case 'recommended':
    default:
      return 'Recommended';
  }
}

export default CarsPage;