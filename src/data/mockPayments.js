// Mock payment methods
export const paymentMethods = [
  {
    id: 'card',
    name: 'Debit/Credit Card',
    description: 'Pay securely with your card',
    icon: '💳',
    enabled: true,
    fee: 0,
    feePercentage: 1.5
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    description: 'Transfer to our bank account',
    icon: '🏦',
    enabled: true,
    fee: 0,
    feePercentage: 0
  },
  {
    id: 'ussd',
    name: 'USSD',
    description: 'Pay with USSD code',
    icon: '📱',
    enabled: true,
    fee: 0,
    feePercentage: 0
  },
  {
    id: 'cash_on_delivery',
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: '💵',
    enabled: true,
    fee: 0,
    feePercentage: 0
  }
];

// Mock bank accounts for bank transfer
export const bankAccounts = [
  {
    bankName: 'Access Bank',
    accountNumber: '0123456789',
    accountName: 'FarmMarket Limited'
  },
  {
    bankName: 'GTBank',
    accountNumber: '0987654321',
    accountName: 'FarmMarket Limited'
  },
  {
    bankName: 'First Bank',
    accountNumber: '1122334455',
    accountName: 'FarmMarket Limited'
  }
];

// Mock USSD codes
export const ussdCodes = [
  { bank: 'Access Bank', code: '*901*000*AMOUNT#' },
  { bank: 'GTBank', code: '*737*000*AMOUNT#' },
  { bank: 'First Bank', code: '*894*000*AMOUNT#' },
  { bank: 'UBA', code: '*919*000*AMOUNT#' },
  { bank: 'Zenith Bank', code: '*966*000*AMOUNT#' }
];

// Payment transactions storage
export let paymentTransactions = [];

// Generate payment reference
export const generatePaymentReference = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `FMP-${timestamp}-${random}`;
};

// Mock payment processing
export const processPayment = async (paymentData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 90% success rate for demo
  const isSuccess = Math.random() > 0.1;

  const transaction = {
    id: paymentTransactions.length + 1,
    reference: generatePaymentReference(),
    amount: paymentData.amount,
    method: paymentData.method,
    status: isSuccess ? 'success' : 'failed',
    orderId: paymentData.orderId,
    createdAt: new Date().toISOString(),
    ...paymentData
  };

  paymentTransactions.push(transaction);

  if (isSuccess) {
    return { success: true, transaction };
  } else {
    return { 
      success: false, 
      error: 'Payment declined. Please try again or use another payment method.',
      transaction 
    };
  }
};

// Validate card number (Luhn algorithm)
export const validateCardNumber = (number) => {
  const cleaned = number.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return false;
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Detect card type
export const detectCardType = (number) => {
  const cleaned = number.replace(/\s/g, '');
  
  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  if (/^6(?:011|5)/.test(cleaned)) return 'discover';
  if (/^(?:2131|1800|35)/.test(cleaned)) return 'jcb';
  
  return 'unknown';
};

// Validate expiry date
export const validateExpiryDate = (expiry) => {
  const [month, year] = expiry.split('/').map(v => parseInt(v, 10));
  if (!month || !year) return false;
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
};

// Validate CVV
export const validateCVV = (cvv, cardType) => {
  if (cardType === 'amex') {
    return /^\d{4}$/.test(cvv);
  }
  return /^\d{3}$/.test(cvv);
};

// Format card number with spaces
export const formatCardNumber = (value) => {
  const cleaned = value.replace(/\s/g, '');
  const match = cleaned.match(/.{1,4}/g);
  return match ? match.join(' ') : cleaned;
};

// Format expiry date
export const formatExpiryDate = (value) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return cleaned.substring(0, 2) + (cleaned.length > 2 ? '/' + cleaned.substring(2, 4) : '');
  }
  return cleaned;
};

// Get payment method by ID
export const getPaymentMethodById = (id) => {
  return paymentMethods.find(method => method.id === id);
};

// Calculate payment fee
export const calculatePaymentFee = (amount, methodId) => {
  const method = getPaymentMethodById(methodId);
  if (!method) return 0;
  
  const percentageFee = (amount * method.feePercentage) / 100;
  return method.fee + percentageFee;
};

// Get transaction by reference
export const getTransactionByReference = (reference) => {
  return paymentTransactions.find(tx => tx.reference === reference);
};

// Get transactions by order ID
export const getTransactionsByOrderId = (orderId) => {
  return paymentTransactions.filter(tx => tx.orderId === orderId);
};