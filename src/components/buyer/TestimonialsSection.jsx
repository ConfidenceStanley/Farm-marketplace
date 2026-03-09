import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Chioma Okafor',
      location: 'Lagos',
      rating: 5,
      text: 'The freshness of the vegetables is unmatched! I love that I can support local farmers while getting quality produce delivered to my door.',
      avatar: 'https://ui-avatars.com/api/?name=Chioma+Okafor&background=22c55e&color=fff'
    },
    {
      id: 2,
      name: 'Ahmed Ibrahim',
      location: 'Abuja',
      rating: 5,
      text: 'Fast delivery and excellent customer service. The farm-fresh eggs and vegetables have become a staple in my household.',
      avatar: 'https://ui-avatars.com/api/?name=Ahmed+Ibrahim&background=22c55e&color=fff'
    },
    {
      id: 3,
      name: 'Blessing Eze',
      location: 'Port Harcourt',
      rating: 5,
      text: 'I appreciate the direct connection with farmers. The quality is amazing and prices are very reasonable. Highly recommend!',
      avatar: 'https://ui-avatars.com/api/?name=Blessing+Eze&background=22c55e&color=fff'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="card p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="text-primary-600 mb-4">
                <FaQuoteLeft className="w-8 h-8 opacity-50" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;