import { useState } from 'react';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import { Button } from '../common';
import { bankAccounts } from '../../data';
import { formatPrice } from '../../utils/helpers';

const BankTransferPayment = ({ amount, onConfirm, isLoading }) => {
  const [selectedBank, setSelectedBank] = useState(bankAccounts[0]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Transfer Instructions</h3>
        <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
          <li>Transfer exactly {formatPrice(amount)} to any of the accounts below</li>
          <li>Use your order number as payment reference</li>
          <li>Click "I have sent the money" after transfer</li>
          <li>Keep your payment receipt for verification</li>
        </ol>
      </div>

      {/* Bank Selection */}
      <div>
        <label className="label">Select Bank</label>
        <div className="grid gap-3">
          {bankAccounts.map((account, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedBank(account)}
              className={`
                p-4 border-2 rounded-lg text-left transition-all
                ${selectedBank === account 
                  ? 'border-primary-600 bg-primary-50' 
                  : 'border-gray-200 hover:border-primary-300'
                }
              `}
            >
              <p className="font-semibold text-gray-800">{account.bankName}</p>
              <p className="text-sm text-gray-600 mt-1">{account.accountName}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white border-2 border-primary-600 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Account Details</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Bank Name</p>
            <p className="text-lg font-semibold text-gray-800">{selectedBank.bankName}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Account Number</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-primary-600">{selectedBank.accountNumber}</p>
              <button
                type="button"
                onClick={() => copyToClipboard(selectedBank.accountNumber)}
                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {copied ? <FaCheckCircle className="w-5 h-5" /> : <FaCopy className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Account Name</p>
            <p className="text-lg font-semibold text-gray-800">{selectedBank.accountName}</p>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500">Amount to Transfer</p>
            <p className="text-3xl font-bold text-green-600">{formatPrice(amount)}</p>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800">
          ⚠️ <strong>Important:</strong> Transfer the exact amount. Your order will be confirmed after payment verification (usually within 15-30 minutes).
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
        I Have Sent the Money
      </Button>
    </div>
  );
};

export default BankTransferPayment;