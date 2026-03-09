export const users = [
  {
    id: 1,
    email: "admin@farmmarket.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    phone: "08012345678",
    avatar: null,
    createdAt: "2026-01-01"
  },
  {
    id: 2,
    email: "buyer@gmail.com",
    password: "buyer123",
    firstName: "John",
    lastName: "Doe",
    role: "buyer",
    phone: "08098765432",
    address: "123 Lagos Street, Ikeja, Lagos",
    avatar: null,
    createdAt: "2026-01-10"
  },
  {
    id: 3,
    email: "sarah@gmail.com",
    password: "sarah123",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "buyer",
    phone: "08011112222",
    address: "45 Abuja Road, Garki, Abuja",
    avatar: null,
    createdAt: "2026-01-15"
  },
  {
    id: 4,
    email: "mike@gmail.com",
    password: "mike123",
    firstName: "Michael",
    lastName: "Okonkwo",
    role: "buyer",
    phone: "08033334444",
    address: "78 Trans Amadi, Port Harcourt, Rivers",
    avatar: null,
    createdAt: "2026-02-01"
  },
  {
    id: 5,
    email: "amina@gmail.com",
    password: "amina123",
    firstName: "Amina",
    lastName: "Bello",
    role: "buyer",
    phone: "08055556666",
    address: "22 Ahmadu Bello Way, Kaduna",
    avatar: null,
    createdAt: "2026-02-15"
  }
];

// Helper functions
export const getUserByEmail = (email) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const getUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};

export const validateUser = (email, password) => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

export const getAllBuyers = () => {
  return users.filter(user => user.role === "buyer");
};

export const getAllUsers = () => users;

export const getBuyerCount = () => {
  return users.filter(user => user.role === "buyer").length;
};