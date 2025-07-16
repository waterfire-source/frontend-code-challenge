import React from 'react';
import { useWishList } from '../context/WishListContext';
import { FiHeart } from 'react-icons/fi';

const WishListIcon: React.FC = () => {
  const { count } = useWishList();
  return (
    <div className="relative flex items-center">
      <FiHeart className="text-2xl text-gray-700 dark:text-gray-300" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
          {count}
        </span>
      )}
    </div>
  );
};

export default WishListIcon; 