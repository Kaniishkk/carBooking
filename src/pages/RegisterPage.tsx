import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideCarFront, LucideMail, LucideLock, LucideUser, LucideArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link to="/" className="inline-flex items-center justify-center">
            <LucideCarFront className="h-10 w-10 text-primary-600 dark:text-primary-400" />
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
              sign in to an existing account
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-dark-600 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10"
        >
          {error && (
            <div className="mb-4 p-3 bg-error-50 dark:bg-error-900/30 text-error-700 dark:text-error-400 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LucideUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input pl-10"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LucideMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LucideLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LucideLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I agree to the{' '}
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Create account
                    <LucideArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-dark-400"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-dark-600 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-dark-400 rounded-md shadow-sm bg-white dark:bg-dark-500 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400"
              >
                <span className="sr-only">Sign up with Google</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545 12.151c0 .866-.693 1.568-1.573 1.568-.876 0-1.577-.702-1.577-1.568 0-.871.701-1.577 1.577-1.577.88 0 1.573.706 1.573 1.577zm3.028 0c0 .866-.694 1.568-1.573 1.568-.876 0-1.577-.702-1.577-1.568 0-.871.701-1.577 1.577-1.577.879 0 1.573.706 1.573 1.577zm3.028 0c0 .866-.694 1.568-1.573 1.568-.876 0-1.577-.702-1.577-1.568 0-.871.701-1.577 1.577-1.577.879 0 1.573.706 1.573 1.577z"/>
                </svg>
              </a>

              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-dark-400 rounded-md shadow-sm bg-white dark:bg-dark-500 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400"
              >
                <span className="sr-only">Sign up with Apple</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.042 6.858c-1.177 0-2.376.608-3.089 1.704-.638.915-.704 2.675 1.182 4.559.395.395.787.732 1.182 1.069-.395-.338-.787-.673-1.182-1.069-.787.789-1.511 1.671-2.18 2.613.122.058.244.12.365.178 1.453.794 2.95 1.498 4.496 2.1.058-.178.122-.356.178-.534.378-1.12.724-2.252 1.035-3.396.178-.635.338-1.275.478-1.919.26-1.169.438-2.354.535-3.548-1.011-.183-2.021-.05-3 .38zm7.944 8.413c-.352-1.099-.903-2.123-1.624-3.019-.724.895-1.503 1.741-2.335 2.532-1.267 1.208-2.654 2.279-4.137 3.198-.12.120.124-.13 0 0 .245.12.49.239.738.356.665.313 1.329.626 1.994.94.12.058.245.115.365.177 0-.058-.061-.115-.061-.177 0 .062.061.12.061.177-.245-.631-.486-1.265-.729-1.898-.12-.3-.239-.596-.358-.896-.062-.178-.178-.535-.031-.698.152-.16.426.12.577.178.548.24 1.095.481 1.638.727.787.358 1.574.72 2.36 1.077 0-.12 0-.239.062-.358.3-.855.56-1.724.78-2.603.061-.239.12-.478.178-.716-.12 0-.239 0-.358.058-.665.119-1.33.238-1.995.358-.245.058-.49.108-.734.17-.181.046-.451.041-.554-.16-.11-.213.087-.39.186-.55.183-.3.37-.598.554-.896.245-.42.49-.835.734-1.255-.06-.058-.12-.058-.178-.058-.426.062-.846.12-1.273.178-.185.025-.441.029-.554-.143-.114-.174-.01-.349.062-.52.184-.416.367-.835.55-1.251-.238 0-.476.058-.714.058-.12 0-.239.062-.358.062-.12 0-.239-.062-.302-.178-.062-.115-.062-.235.062-.35.188-.178.376-.358.564-.535-1.14.535-2.156 1.289-3 2.22.902 1.21 2.089 2.187 3.464 2.84-.47.598-.903 1.192-1.33 1.786z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;