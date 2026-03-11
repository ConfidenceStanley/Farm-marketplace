import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Input, Button } from '../common';
import { 
  validateCardNumber, 
  validateExpiryDate, 
  validateCVV,
  formatCardNumber,
  formatExpiryDate,
  detectCardType 
} from '../../data';

const CardPaymentForm = ({ amount, onSubmit, isLoading }) => {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    if (name === 'number') {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s/g, '').length > 19) return;
    }
    
    if (name === 'expiry') {
      formattedValue = formatExpiryDate(value);
      if (formattedValue.length > 5) return;
    }
    
    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }
    
    if (name === 'name') {
      formattedValue = value.toUpperCase();
    }
    
    setCardData(prev => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInputFocus = (e) => {
    setCardData(prev => ({ ...prev, focused: e.target.name }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!cardData.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    }
    
    if (!cardData.number) {
      newErrors.number = 'Card number is required';
    } else if (!validateCardNumber(cardData.number)) {
      newErrors.number = 'Invalid card number';
    }
    
    if (!cardData.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!validateExpiryDate(cardData.expiry)) {
      newErrors.expiry = 'Invalid or expired date';
    }
    
    if (!cardData.cvc) {
      newErrors.cvc = 'CVV is required';
    } else {
      const cardType = detectCardType(cardData.number);
      if (!validateCVV(cardData.cvc, cardType)) {
        newErrors.cvc = 'Invalid CVV';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit({
      cardNumber: cardData.number,
      cardName: cardData.name,
      expiryDate: cardData.expiry,
      cvv: cardData.cvc,
      cardType: detectCardType(cardData.number)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Preview */}
      <div className="flex justify-center mb-8">
        <Cards
          number={cardData.number}
          name={cardData.name}
          expiry={cardData.expiry}
          cvc={cardData.cvc}
          focused={cardData.focused}
        />
      </div>

      {/* Card Number */}
      <Input
        label="Card Number"
        type="text"
        name="number"
        placeholder="1234 5678 9012 3456"
        value={cardData.number}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        error={errors.number}
        maxLength="19"
      />

      {/* Cardholder Name */}
      <Input
        label="Cardholder Name"
        type="text"
        name="name"
        placeholder="CONFIDENCE OHIREIMEN"
        value={cardData.name}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        error={errors.name}
      />

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry Date"
          type="text"
          name="expiry"
          placeholder="MM/YY"
          value={cardData.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          error={errors.expiry}
          maxLength="5"
        />
        <Input
          label="CVV"
          type="text"
          name="cvc"
          placeholder="123"
          value={cardData.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          error={errors.cvc}
          maxLength="4"
        />
      </div>

      {/* Security Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          🔒 Your payment information is encrypted and secure. We use industry-standard SSL encryption.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        size="lg"
        isLoading={isLoading}
      >
        Pay {amount}
      </Button>
    </form>
  );
};

export default CardPaymentForm;