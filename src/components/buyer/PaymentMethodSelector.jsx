import { useState } from 'react';
import { paymentMethods, calculatePaymentFee } from '../../data';
import { formatPrice } from '../../utils/helpers';

const PaymentMethodSelector = ({ selectedMethod, onSelectMethod, amount }) => {
  return (
    <div className="space-y-3">
      {paymentMethods.map(method => {
        const fee = calculatePaymentFee(amount, method.id);
        const isSelected = selectedMethod === method.id;
        
        return (
          <button
            key={method.id}
            onClick={() => onSelectMethod(method.id)}
            disabled={!method.enabled}
            className={`
              w-full p-4 rounded-lg border-2 transition-all text-left
              ${isSelected 
                ? 'border-primary-600 bg-primary-50' 
                : 'border-gray-200 hover:border-primary-300'
              }
              ${!method.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{method.icon}</div>
                <div>
                  <p className="font-semibold text-gray-800">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                  {fee > 0 && (
                    <p className="text-xs text-orange-600 mt-1">
                      Fee: {formatPrice(fee)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${isSelected ? 'border-primary-600' : 'border-gray-300'}
              `}>
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;