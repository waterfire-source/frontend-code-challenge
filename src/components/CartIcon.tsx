import React from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

const CartIcon: React.FC = () => {
  const { count, total } = useCart();
  return (
    <div className="relative flex items-center">
      <FiShoppingCart className="text-2xl text-gray-700 dark:text-gray-300" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
          {count}
        </span>
      )}
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-semibold">
        {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(total)}
      </span>
    </div>
  );
};

export default CartIcon; 