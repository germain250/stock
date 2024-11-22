import { useState } from 'react';
import PropTypes from 'prop-types';

const InputModal = ({ isOpen, title = "StockIn", onConfirm, onCancel, confirmText = "StockIn" }) => {
  const [quantity, setQuantity] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (quantity) {
      onConfirm(quantity);
      setQuantity('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-lg max-w-md w-full">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none"
        >
          <svg className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
            <path d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="text-center p-4">
          <h3 className="text-lg font-bold mb-3 text-gray-700 dark:text-gray-200">{title}</h3>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 mb-5 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-5 py-2.5 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

InputModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
};

export default InputModal;