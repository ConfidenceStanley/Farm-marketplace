export const categories = [
  {
    id: 1,
    name: "Vegetables",
    slug: "vegetables",
    description: "Fresh farm vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop&auto=format",
    productCount: 10
  },
  {
    id: 2,
    name: "Fruits",
    slug: "fruits",
    description: "Organic fresh fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop&auto=format",
    productCount: 8
  },
  {
    id: 3,
    name: "Grains & Cereals",
    slug: "grains-cereals",
    description: "Healthy grains and cereals",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop&auto=format",
    productCount: 5
  },
  {
    id: 4,
    name: "Tubers",
    slug: "tubers",
    description: "Root vegetables and tubers",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&auto=format",
    productCount: 5
  },
  {
    id: 5,
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    description: "Farm fresh dairy products",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=400&fit=crop&auto=format",
    productCount: 5
  },
  {
    id: 6,
    name: "Livestock",
    slug: "livestock",
    description: "Fresh meat and poultry",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop&auto=format",
    productCount: 7
  }
];

export const getCategoryBySlug = (slug) => {
  return categories.find(cat => cat.slug === slug);
};

export const getCategoryById = (id) => {
  return categories.find(cat => cat.id === parseInt(id));
};

export const getAllCategories = () => categories;