export const products = [
  // ==================== VEGETABLES (Category 1) ====================
  {
    id: 1,
    name: "Fresh Tomatoes",
    slug: "fresh-tomatoes",
    description: "Locally grown fresh tomatoes, perfect for salads and cooking. These tomatoes are handpicked from our partner farms ensuring the best quality.",
    price: 2500,
    unit: "basket",
    categoryId: 1,
    categoryName: "Vegetables",
    farmerName: "Adebayo Farms",
    location: "Ogun State",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 50,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 28,
    createdAt: "2026-03-15"
  },
  {
    id: 2,
    name: "Organic Carrots",
    slug: "organic-carrots",
    description: "Sweet and crunchy organic carrots. Rich in vitamins and perfect for juicing or cooking.",
    price: 1800,
    unit: "kg",
    categoryId: 1,
    categoryName: "Vegetables",
    farmerName: "Green Valley Farm",
    location: "Kaduna State",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 35,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 42,
    createdAt: "2026-03-14"
  },
  {
    id: 3,
    name: "Fresh Spinach",
    slug: "fresh-spinach",
    description: "Nutrient-rich fresh spinach leaves. Perfect for smoothies, salads, and Nigerian dishes.",
    price: 500,
    unit: "bunch",
    categoryId: 1,
    categoryName: "Vegetables",
    farmerName: "Mama Ngozi Farm",
    location: "Enugu State",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 100,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 35,
    createdAt: "2026-03-13"
  },
  {
    id: 11,
    name: "Fresh Cabbage",
    slug: "fresh-cabbage",
    description: "Crispy green cabbage. Perfect for salads and coleslaw.",
    price: 800,
    unit: "head",
    categoryId: 1,
    categoryName: "Vegetables",
    farmerName: "Green Leaf Farms",
    location: "Jos, Plateau",
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 70,
    isAvailable: true,
    rating: 4.3,
    reviewCount: 19,
    createdAt: "2026-02-25"
  },
  {
    id: 12,
    name: "Red Onions",
    slug: "red-onions",
    description: "Fresh red onions. Essential for every kitchen.",
    price: 4500,
    unit: "bag",
    categoryId: 1,
    categoryName: "Vegetables",
    farmerName: "Sokoto Farms",
    location: "Sokoto State",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 55,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 47,
    createdAt: "2026-02-20"
  },
  {
    id: 13,
    name: "Fresh Cucumbers",
    slug: "fresh-cucumbers",
    description: "Crunchy green cucumbers perfect for salads and healthy snacks.",
    price: 1200,
    unit: "basket",
    categoryId: 1,
    categoryName: "Vegetables",
    farmerName: "Green Garden Farms",
    location: "Lagos State",
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 60,
    isAvailable: true,
    rating: 4.4,
    reviewCount: 31,
    createdAt: "2026-02-18"
  },
  {
    id: 20,
    name: "Fresh Green Pepper",
    slug: "fresh-green-pepper",
    description: "Crisp and flavorful green bell peppers. Perfect for salads, stir-fries, and stews.",
    price: 1500,
    unit: "kg",
    categoryId: 1,
    categoryName: "Vegetables",
    farmerName: "Pepper Farm Nigeria",
    location: "Kano State",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 45,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 33,
    createdAt: "2026-02-15"
  },
  {
    id: 21,
    name: "Fresh Lettuce",
    slug: "fresh-lettuce",
    description: "Crispy fresh lettuce leaves. Ideal for salads, burgers, and wraps.",
    price: 600,
    unit: "head",
    categoryId: 1,
    categoryName: "Vegetables",
    farmerName: "Garden Fresh Farms",
    location: "Abuja",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 80,
    isAvailable: true,
    rating: 4.4,
    reviewCount: 25,
    createdAt: "2026-02-12"
  },
  {
    id: 22,
    name: "Scotch Bonnet Pepper",
    slug: "scotch-bonnet-pepper",
    description: "Hot and spicy scotch bonnet peppers (Ata rodo). Essential for Nigerian cooking.",
    price: 3500,
    unit: "basket",
    categoryId: 1,
    categoryName: "Vegetables",
    farmerName: "Spice King Farms",
    location: "Oyo State",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 40,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 58,
    createdAt: "2026-02-10"
  },
  {
    id: 23,
    name: "Fresh Okra",
    slug: "fresh-okra",
    description: "Tender fresh okra (lady fingers). Perfect for soups and stews.",
    price: 900,
    unit: "bunch",
    categoryId: 1,
    categoryName: "Vegetables",
    farmerName: "Delta Green Farms",
    location: "Delta State",
    image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 65,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 29,
    createdAt: "2026-02-08"
  },

  // ==================== FRUITS (Category 2) ====================
  {
    id: 4,
    name: "Sweet Oranges",
    slug: "sweet-oranges",
    description: "Juicy and sweet oranges from the best orchards. Rich in Vitamin C.",
    price: 3000,
    unit: "bag",
    categoryId: 2,
    categoryName: "Fruits",
    farmerName: "Citrus Grove",
    location: "Benue State",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 25,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 56,
    createdAt: "2026-03-12"
  },
  {
    id: 5,
    name: "Ripe Plantains",
    slug: "ripe-plantains",
    description: "Sweet ripe plantains, perfect for frying or roasting. A Nigerian favorite!",
    price: 2000,
    unit: "bunch",
    categoryId: 2,
    categoryName: "Fruits",
    farmerName: "Eze Plantain Farm",
    location: "Ondo State",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 40,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 89,
    createdAt: "2026-03-11"
  },
  {
    id: 6,
    name: "Fresh Watermelon",
    slug: "fresh-watermelon",
    description: "Sweet and refreshing watermelon. Perfect for hot days!",
    price: 1500,
    unit: "piece",
    categoryId: 2,
    categoryName: "Fruits",
    farmerName: "Sunshine Farms",
    location: "Kano State",
    image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1589984662646-e7b2e4f8cd5a?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 20,
    isAvailable: true,
    rating: 4.4,
    reviewCount: 23,
    createdAt: "2026-03-10"
  },
  {
    id: 14,
    name: "Fresh Pineapple",
    slug: "fresh-pineapple",
    description: "Sweet tropical pineapple harvested at peak ripeness.",
    price: 1800,
    unit: "piece",
    categoryId: 2,
    categoryName: "Fruits",
    farmerName: "Tropical Harvest",
    location: "Cross River State",
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 35,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 44,
    createdAt: "2026-02-28"
  },
  {
    id: 24,
    name: "Fresh Mangoes",
    slug: "fresh-mangoes",
    description: "Juicy, sweet mangoes perfect for eating fresh or making smoothies.",
    price: 2500,
    unit: "basket",
    categoryId: 2,
    categoryName: "Fruits",
    farmerName: "Mango Valley Farm",
    location: "Taraba State",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 30,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 62,
    createdAt: "2026-02-22"
  },
  {
    id: 25,
    name: "Fresh Bananas",
    slug: "fresh-bananas",
    description: "Ripe sweet bananas rich in potassium. Great for snacking and smoothies.",
    price: 1500,
    unit: "bunch",
    categoryId: 2,
    categoryName: "Fruits",
    farmerName: "Yellow Sun Farms",
    location: "Edo State",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 55,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 41,
    createdAt: "2026-02-05"
  },
  {
    id: 26,
    name: "Fresh Pawpaw",
    slug: "fresh-pawpaw",
    description: "Sweet and nutritious papaya (pawpaw). Rich in vitamins and great for digestion.",
    price: 1200,
    unit: "piece",
    categoryId: 2,
    categoryName: "Fruits",
    farmerName: "Tropical Delight Farm",
    location: "Rivers State",
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 28,
    isAvailable: true,
    rating: 4.4,
    reviewCount: 33,
    createdAt: "2026-01-30"
  },
  {
    id: 27,
    name: "Fresh Coconut",
    slug: "fresh-coconut",
    description: "Fresh coconuts with sweet water and tender flesh. Perfect for drinking and cooking.",
    price: 500,
    unit: "piece",
    categoryId: 2,
    categoryName: "Fruits",
    farmerName: "Coastal Farms",
    location: "Lagos State",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 75,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 38,
    createdAt: "2026-01-28"
  },

  // ==================== GRAINS & CEREALS (Category 3) ====================
  {
    id: 7,
    name: "Brown Rice",
    slug: "brown-rice",
    description: "Locally produced brown rice. Healthier alternative to white rice.",
    price: 15000,
    unit: "50kg bag",
    categoryId: 3,
    categoryName: "Grains & Cereals",
    farmerName: "Rice Masters",
    location: "Kebbi State",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 15,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 67,
    createdAt: "2026-03-08"
  },
  {
    id: 15,
    name: "Yellow Maize",
    slug: "yellow-maize",
    description: "Dried yellow maize grains suitable for pap, corn flour, and livestock feed.",
    price: 12000,
    unit: "50kg bag",
    categoryId: 3,
    categoryName: "Grains & Cereals",
    farmerName: "Golden Field Farms",
    location: "Niger State",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 22,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 51,
    createdAt: "2026-02-26"
  },
  {
    id: 28,
    name: "White Rice (Ofada)",
    slug: "white-rice-ofada",
    description: "Premium Nigerian Ofada rice with unique aroma and taste. Locally grown and processed.",
    price: 18000,
    unit: "50kg bag",
    categoryId: 3,
    categoryName: "Grains & Cereals",
    farmerName: "Ofada Rice Collective",
    location: "Ogun State",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 18,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 72,
    createdAt: "2026-02-15"
  },
  {
    id: 29,
    name: "Millet Grains",
    slug: "millet-grains",
    description: "Nutritious millet grains (Jero). Great for making fura, pap, and swallow.",
    price: 8000,
    unit: "50kg bag",
    categoryId: 3,
    categoryName: "Grains & Cereals",
    farmerName: "Sahel Grains",
    location: "Zamfara State",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 25,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 34,
    createdAt: "2026-01-25"
  },
  {
    id: 30,
    name: "Sorghum (Guinea Corn)",
    slug: "sorghum-guinea-corn",
    description: "High quality sorghum grains. Ideal for making pap, kunu, and burukutu.",
    price: 9000,
    unit: "50kg bag",
    categoryId: 3,
    categoryName: "Grains & Cereals",
    farmerName: "Northern Harvest",
    location: "Kaduna State",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 20,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 28,
    createdAt: "2026-01-22"
  },

  // ==================== TUBERS (Category 4) ====================
  {
    id: 8,
    name: "Fresh Yam",
    slug: "fresh-yam",
    description: "Premium quality yam tubers. Perfect for pounding, frying, or boiling.",
    price: 5000,
    unit: "tuber",
    categoryId: 4,
    categoryName: "Tubers",
    farmerName: "Yam King Farms",
    location: "Benue State",
    image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 30,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 102,
    createdAt: "2026-03-05"
  },
  {
    id: 9,
    name: "Sweet Potatoes",
    slug: "sweet-potatoes",
    description: "Nutritious sweet potatoes. Great for healthy meals.",
    price: 3500,
    unit: "bag",
    categoryId: 4,
    categoryName: "Tubers",
    farmerName: "Root Harvest",
    location: "Jos, Plateau",
    image: "https://images.unsplash.com/photo-1596097635121-14b63a7a6e2c?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1596097635121-14b63a7a6e2c?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 45,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 38,
    createdAt: "2026-03-02"
  },
  {
    id: 16,
    name: "Cassava Tubers",
    slug: "cassava-tubers",
    description: "Fresh cassava roots used for garri, fufu, and starch production.",
    price: 3000,
    unit: "bundle",
    categoryId: 4,
    categoryName: "Tubers",
    farmerName: "Delta Roots Farm",
    location: "Delta State",
    image: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 40,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 27,
    createdAt: "2026-02-20"
  },
  {
    id: 31,
    name: "Irish Potatoes",
    slug: "irish-potatoes",
    description: "Fresh Irish potatoes perfect for fries, mashed potatoes, and stews.",
    price: 4000,
    unit: "bag",
    categoryId: 4,
    categoryName: "Tubers",
    farmerName: "Plateau Fresh Farms",
    location: "Jos, Plateau",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 35,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 45,
    createdAt: "2026-01-18"
  },
  {
    id: 32,
    name: "Cocoyam",
    slug: "cocoyam",
    description: "Fresh cocoyam tubers. Great for soups and as an alternative to yam.",
    price: 2500,
    unit: "bag",
    categoryId: 4,
    categoryName: "Tubers",
    farmerName: "Eastern Harvest",
    location: "Anambra State",
    image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 28,
    isAvailable: true,
    rating: 4.3,
    reviewCount: 19,
    createdAt: "2026-01-15"
  },

  // ==================== DAIRY & EGGS (Category 5) ====================
  {
    id: 10,
    name: "Farm Fresh Eggs",
    slug: "farm-fresh-eggs",
    description: "Free-range chicken eggs. Fresh from the farm daily.",
    price: 3000,
    unit: "crate",
    categoryId: 5,
    categoryName: "Dairy & Eggs",
    farmerName: "Happy Hen Farm",
    location: "Ibadan, Oyo",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 60,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 91,
    createdAt: "2026-03-01"
  },
  {
    id: 17,
    name: "Fresh Cow Milk",
    slug: "fresh-cow-milk",
    description: "Pure fresh cow milk sourced from local dairy farms. Pasteurized and safe.",
    price: 2000,
    unit: "liter",
    categoryId: 5,
    categoryName: "Dairy & Eggs",
    farmerName: "Northern Dairy Farm",
    location: "Plateau State",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 50,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 36,
    createdAt: "2026-02-25"
  },
  {
    id: 33,
    name: "Local Cheese (Wara)",
    slug: "local-cheese-wara",
    description: "Traditional Nigerian soft cheese made from fresh cow milk. Great for frying or eating fresh.",
    price: 1500,
    unit: "pack",
    categoryId: 5,
    categoryName: "Dairy & Eggs",
    farmerName: "Fulani Dairy Collective",
    location: "Kwara State",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 30,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 42,
    createdAt: "2026-01-28"
  },
  {
    id: 34,
    name: "Fresh Yoghurt (Fura da Nono)",
    slug: "fresh-yoghurt-fura-da-nono",
    description: "Traditional fermented milk drink. Refreshing and nutritious.",
    price: 800,
    unit: "bottle",
    categoryId: 5,
    categoryName: "Dairy & Eggs",
    farmerName: "Hausa Dairy Farm",
    location: "Kano State",
    image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 45,
    isAvailable: true,
    rating: 4.4,
    reviewCount: 28,
    createdAt: "2026-01-20"
  },
  {
    id: 35,
    name: "Quail Eggs",
    slug: "quail-eggs",
    description: "Nutritious quail eggs packed with protein and vitamins. Great for health-conscious consumers.",
    price: 2500,
    unit: "pack of 30",
    categoryId: 5,
    categoryName: "Dairy & Eggs",
    farmerName: "Exotic Poultry Farm",
    location: "Lagos State",
    image: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 25,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 33,
    createdAt: "2026-01-18"
  },

  // ==================== LIVESTOCK (Category 6) ====================
  {
    id: 18,
    name: "Live Broiler Chicken",
    slug: "live-broiler-chicken",
    description: "Healthy broiler chicken raised naturally on farm feed. Average weight 2-3kg.",
    price: 8500,
    unit: "bird",
    categoryId: 6,
    categoryName: "Livestock",
    farmerName: "Sunrise Poultry",
    location: "Oyo State",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 18,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 22,
    createdAt: "2026-02-28"
  },
  {
    id: 19,
    name: "Live Cow",
    slug: "live-cow",
    description: "Healthy cattle raised on natural pasture. Ideal for meat production or breeding. Average weight 300-400kg.",
    price: 450000,
    unit: "head",
    categoryId: 6,
    categoryName: "Livestock",
    farmerName: "Northern Cattle Ranch",
    location: "Kebbi State",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 8,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 12,
    createdAt: "2026-02-15"
  },
  {
    id: 36,
    name: "Live Turkey",
    slug: "live-turkey",
    description: "Large healthy turkey birds. Perfect for celebrations and special occasions. Average weight 5-8kg.",
    price: 25000,
    unit: "bird",
    categoryId: 6,
    categoryName: "Livestock",
    farmerName: "Gobbler Farms",
    location: "Nasarawa State",
    image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 12,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 18,
    createdAt: "2026-01-25"
  },
  {
    id: 37,
    name: "Live Goat",
    slug: "live-goat",
    description: "Healthy local breed goats. Ideal for meat or breeding purposes. Average weight 25-35kg.",
    price: 45000,
    unit: "head",
    categoryId: 6,
    categoryName: "Livestock",
    farmerName: "Sahel Livestock",
    location: "Sokoto State",
    image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 15,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 24,
    createdAt: "2026-01-20"
  },
  {
    id: 38,
    name: "Live Ram",
    slug: "live-ram",
    description: "Healthy rams perfect for celebrations especially Eid. Average weight 40-60kg.",
    price: 85000,
    unit: "head",
    categoryId: 6,
    categoryName: "Livestock",
    farmerName: "Arewa Livestock",
    location: "Kano State",
    image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 10,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 31,
    createdAt: "2026-01-15"
  },
  {
    id: 39,
    name: "Layer Chickens",
    slug: "layer-chickens",
    description: "Productive layer chickens ready to lay eggs. 18 weeks old point-of-lay birds.",
    price: 5500,
    unit: "bird",
    categoryId: 6,
    categoryName: "Livestock",
    farmerName: "Egg Master Poultry",
    location: "Ogun State",
    image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 50,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 27,
    createdAt: "2026-01-12"
  },
  {
    id: 40,
    name: "Catfish (Live)",
    slug: "catfish-live",
    description: "Fresh live catfish from fish farms. Healthy and ready for consumption. Average weight 1-1.5kg.",
    price: 3500,
    unit: "kg",
    categoryId: 6,
    categoryName: "Livestock",
    farmerName: "Aqua Fish Farm",
    location: "Lagos State",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop&auto=format"
    ],
    stock: 100,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 55,
    createdAt: "2026-01-10"
  }
];

// Helper functions
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug);
};

export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.categoryId === parseInt(categoryId));
};

export const getProductsByCategorySlug = (categorySlug) => {
  const categoryMap = {
    'vegetables': 1,
    'fruits': 2,
    'grains-cereals': 3,
    'tubers': 4,
    'dairy-eggs': 5,
    'livestock': 6
  };
  const categoryId = categoryMap[categorySlug];
  return categoryId ? products.filter(product => product.categoryId === categoryId) : [];
};

export const getFeaturedProducts = (limit = 8) => {
  return products.filter(p => p.isAvailable).slice(0, limit);
};

export const getNewArrivals = (limit = 8) => {
  return [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.categoryName.toLowerCase().includes(searchTerm) ||
    product.farmerName.toLowerCase().includes(searchTerm) ||
    product.location.toLowerCase().includes(searchTerm)
  );
};

export const getProductCount = () => products.length;

export const getProductCountByCategory = () => {
  const counts = {};
  products.forEach(product => {
    counts[product.categoryId] = (counts[product.categoryId] || 0) + 1;
  });
  return counts;
};