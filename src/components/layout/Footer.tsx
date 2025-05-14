import React from 'react';
import { Link } from 'react-router-dom';
import { LucideCarFront, LucideInstagram, LucideTwitter, LucideFacebook, LucideYoutube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-dark-600 border-t border-gray-200 dark:border-dark-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center">
              <LucideCarFront className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">LuxeAuto</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Experience the finest in luxury car rentals. Drive in style, comfort and convenience.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialIcon icon={<LucideInstagram size={18} />} href="#" />
              <SocialIcon icon={<LucideTwitter size={18} />} href="#" />
              <SocialIcon icon={<LucideFacebook size={18} />} href="#" />
              <SocialIcon icon={<LucideYoutube size={18} />} href="#" />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/cars" label="Browse Cars" />
              <FooterLink href="/register" label="Sign Up" />
              <FooterLink href="/login" label="Sign In" />
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Car Categories
            </h3>
            <ul className="mt-4 space-y-2">
              <FooterLink href="/cars?category=luxury" label="Luxury" />
              <FooterLink href="/cars?category=sports" label="Sports" />
              <FooterLink href="/cars?category=suv" label="SUVs" />
              <FooterLink href="/cars?category=electric" label="Electric" />
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                123 Luxury Drive, Beverly Hills
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                (800) LUXE-AUTO
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                info@luxeauto.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-500">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} LuxeAuto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => {
  return (
    <a
      href={href}
      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

const FooterLink: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  return (
    <li>
      <Link to={href} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
        {label}
      </Link>
    </li>
  );
};

export default Footer;