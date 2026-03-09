import { Link } from 'react-router-dom';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Download Our Mobile App
            </h2>
            <p className="text-primary-100 text-lg mb-8 leading-relaxed">
              Shop on the go! Get exclusive mobile-only deals, faster checkout, 
              and real-time order tracking. Available on iOS and Android.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#"
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <FaApple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>
              <a 
                href="#"
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <FaGooglePlay className="w-7 h-7" />
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary-400/30 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop"
                alt="Mobile App"
                className="relative rounded-3xl shadow-2xl w-64 h-auto"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;