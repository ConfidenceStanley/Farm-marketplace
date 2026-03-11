import { useState } from 'react';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import { Button } from '../common';
import { ussdCodes } from '../../data';
import { formatPrice } from '../../utils/helpers';

const USSDPayment = ({ amount, onConfirm, isLoading }) => {
  const [selectedBank, setSelectedBank] = useState(ussdCodes[0]);
  const [copied, setCopied] = useState(false);

  // Replace AMOUNT with actual amount
  const getUSSDCode = (code) => {
    return code.replace('AMOUNT', amount.toString());
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">How to Pay with USSD</h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Select your bank from the options below</li>
          <li>Dial the USSD code on your phone</li>
          <li>Follow the prompts to complete payment</li>
          <li>Click "I have completed payment" when done</li>
        </ol>
      </div>

      {/* Amount Display */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600">Amount to Pay</p>
        <p className="text-3xl font-bold text-primary-600">{formatPrice(amount)}</p>
      </div>

      {/* Bank Selection */}
      <div>
        <label className="label">Select Your Bank</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ussdCodes.map((bank, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedBank(bank)}
              className={`
                p-3 border-2 rounded-lg text-center transition-all
                ${selectedBank === bank 
                  ? 'border-primary-600 bg-primary-50' 
                  : 'border-gray-200 hover:border-primary-300'
                }
              `}
            >
              <p className="font-semibold text-sm text-gray-800">{bank.bank}</p>
            </button>
          ))}
        </div>
      </div>

      {/* USSD Code Display */}
      <div className="bg-gray-900 rounded-lg p-6 text-center">
        <p className="text-sm text-gray-400 mb-2">Dial this code on your phone</p>
        <div className="flex items-center justify-center gap-3">
          <p className="text-3xl font-mono font-bold text-white">
            {getUSSDCode(selectedBank.code)}
          </p>
          <button
            type="button"
            onClick={() => copyToClipboard(getUSSDCode(selectedBank.code))}
            className="p-2 text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copied ? (
              <FaCheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <FaCopy className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-2">{selectedBank.bank}</p>
      </div>

      {/* Steps Visual */}
      <div className="grid grid-cols-4 gap-2">
        {['Dial', 'Enter PIN', 'Confirm', 'Done'].map((step, index) => (
          <div key={index} className="text-center">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary-600 font-bold">{index + 1}</span>
            </div>
            <p className="text-xs text-gray-600">{step}</p>
          </div>
        ))}
      </div>

      {/* Help Text */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          💡 <strong>Tip:</strong> Make sure you have sufficient balance in your bank account. You will receive an SMS confirmation after successful payment.
        </p>
      </div>

      {/* Confirm Button */}
      <Button
        type="button"
        onClick={onConfirm}
        fullWidth
        size="lg"
        isLoading={isLoading}
      >
        I Have Completed Payment
      </Button>
    </div>
  );
};

export default USSDPayment;