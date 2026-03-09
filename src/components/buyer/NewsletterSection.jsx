import { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { Button, Input } from '../common';
import { isValidEmail } from '../../utils/helpers';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSuccess(true);
    setEmail('');
    setIsLoading(false);

    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className="section-padding bg-primary-600">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <FaEnvelope className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get Fresh Updates
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Subscribe to our newsletter for exclusive deals, new arrivals, and farming tips!
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    error ? 'ring-2 ring-red-400' : ''
                  }`}
                />
              </div>
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-white text-primary-600 hover:bg-primary-50 focus:ring-white/50 whitespace-nowrap"
                rightIcon={<FaPaperPlane />}
              >
                Subscribe
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-200 text-sm mt-2 text-left">{error}</p>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-4 py-3 rounded-lg mt-4 text-sm">
                🎉 Thanks for subscribing! Check your email for confirmation.
              </div>
            )}
          </form>

          {/* Privacy Note */}
          <p className="text-primary-200 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;