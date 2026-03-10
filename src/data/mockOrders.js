export let orders = [
  {
    id: 1,
    orderNumber: "ORD-2026-001",
    userId: 2,
    userName: "Confidence Ohireimen",
    userEmail: "confidence@gmail.com",
    userPhone: "08098765432",
    deliveryAddress: "123 Lagos Street, Ikeja, Lagos",
    items: [
      {
        productId: 1,
        productName: "Fresh Tomatoes",
        quantity: 3,
        price: 2500,
        unit: "basket",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop&auto=format"
      },
      {
        productId: 4,
        productName: "Sweet Oranges",
        quantity: 2,
        price: 3000,
        unit: "bag",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&auto=format"
      }
    ],
    subtotal: 13500,
    deliveryFee: 1500,
    totalAmount: 15000,
    status: "pending",
    paymentMethod: "cash_on_delivery",
    notes: "Please call before delivery",
    createdAt: "2026-03-15T10:30:00",
    updatedAt: "2026-03-15T10:30:00"
  },
  {
    id: 2,
    orderNumber: "ORD-2026-002",
    userId: 3,
    userName: "Sarah Johnson",
    userEmail: "sarah@gmail.com",
    userPhone: "08011112222",
    deliveryAddress: "45 Abuja Road, Garki, Abuja",
    items: [
      {
        productId: 8,
        productName: "Fresh Yam",
        quantity: 5,
        price: 5000,
        unit: "tuber",
        image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop&auto=format"
      }
    ],
    subtotal: 25000,
    deliveryFee: 2000,
    totalAmount: 27000,
    status: "confirmed",
    paymentMethod: "cash_on_delivery",
    notes: "",
    createdAt: "2026-03-14T14:20:00",
    updatedAt: "2026-03-14T16:00:00"
  },
  {
    id: 3,
    orderNumber: "ORD-2026-003",
    userId: 2,
    userName: "Mide Olawale",
    userEmail: "mide@gmail.com",
    userPhone: "08098765432",
    deliveryAddress: "126 Ilaro 1001, Ogun State",
    items: [
      {
        productId: 10,
        productName: "Farm Fresh Eggs",
        quantity: 2,
        price: 3000,
        unit: "crate",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop&auto=format"
      },
      {
        productId: 5,
        productName: "Ripe Plantains",
        quantity: 3,
        price: 2000,
        unit: "bunch",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&auto=format"
      }
    ],
    subtotal: 12000,
    deliveryFee: 1500,
    totalAmount: 13500,
    status: "delivered",
    paymentMethod: "cash_on_delivery",
    notes: "Leave at gate if not home",
    createdAt: "2026-03-10T09:15:00",
    updatedAt: "2026-03-12T11:30:00"
  },
  {
    id: 4,
    orderNumber: "ORD-2026-004",
    userId: 3,
    userName: "Sarah Johnson",
    userEmail: "sarah@email.com",
    userPhone: "08011112222",
    deliveryAddress: "45 Abuja Road, Garki, Abuja",
    items: [
      {
        productId: 18,
        productName: "Live Broiler Chicken",
        quantity: 3,
        price: 8500,
        unit: "bird",
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop&auto=format"
      },
      {
        productId: 7,
        productName: "Brown Rice",
        quantity: 1,
        price: 15000,
        unit: "50kg bag",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&auto=format"
      }
    ],
    subtotal: 40500,
    deliveryFee: 2500,
    totalAmount: 43000,
    status: "pending",
    paymentMethod: "cash_on_delivery",
    notes: "Deliver in the morning",
    createdAt: "2026-03-13T08:45:00",
    updatedAt: "2026-03-13T08:45:00"
  },
  {
    id: 5,
    orderNumber: "ORD-2026-005",
    userId: 2,
    userName: "Confidence Oracle",
    userEmail: "oracle@email.com",
    userPhone: "08098765432",
    deliveryAddress: "123 Surulere Street, Alagbado, Lagos State",
    items: [
      {
        productId: 24,
        productName: "Fresh Mangoes",
        quantity: 2,
        price: 2500,
        unit: "basket",
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&auto=format"
      },
      {
        productId: 14,
        productName: "Fresh Pineapple",
        quantity: 3,
        price: 1800,
        unit: "piece",
        image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop&auto=format"
      }
    ],
    subtotal: 10400,
    deliveryFee: 1500,
    totalAmount: 11900,
    status: "delivered",
    paymentMethod: "cash_on_delivery",
    notes: "",
    createdAt: "2026-02-28T15:30:00",
    updatedAt: "2026-03-02T14:00:00"
  }
];

// Helper functions
export const getOrderById = (id) => {
  return orders.find(order => order.id === parseInt(id));
};

export const getOrdersByUserId = (userId) => {
  return orders
    .filter(order => order.userId === parseInt(userId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getAllOrders = () => {
  return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getOrdersByStatus = (status) => {
  return orders.filter(order => order.status === status);
};

export const generateOrderNumber = () => {
  const year = new Date().getFullYear();
  const count = orders.length + 1;
  return `ORD-${year}-${String(count).padStart(3, '0')}`;
};

export const addOrder = (orderData) => {
  const newOrder = {
    id: orders.length + 1,
    orderNumber: generateOrderNumber(),
    ...orderData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  orders.push(newOrder);
  return newOrder;
};

export const updateOrderStatus = (orderId, status) => {
  const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    return orders[orderIndex];
  }
  return null;
};

// Statistics for admin dashboard
export const getOrderStats = () => {
  return {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
    totalRevenue: orders
      .filter(o => o.status === "delivered")
      .reduce((sum, o) => sum + o.totalAmount, 0)
  };
};

export const getRecentOrders = (limit = 5) => {
  return getAllOrders().slice(0, limit);
};