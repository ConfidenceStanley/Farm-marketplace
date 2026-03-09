import { FaTruck, FaLeaf, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: FaTruck,
      title: 'Fast Delivery',
      description: 'Get your orders delivered within 24-48 hours',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: FaLeaf,
      title: 'Fresh & Organic',
      description: '100% organic produce directly from farms',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: FaShieldAlt,
      title: 'Quality Assured',
      description: 'All products are quality checked before delivery',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Customer support available round the clock',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;