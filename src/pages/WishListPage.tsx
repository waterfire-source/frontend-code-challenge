import React from 'react';
import { useWishList } from '../context/WishListContext';
import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const WishListPage: React.FC = () => {
  const { wishList, removeFromWishList } = useWishList();
  const { addToCart } = useCart();

  if (wishList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Wish List</h1>
        <div className="text-center py-16">
          <FiHeart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Your wish list is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Start adding items you love to your wish list!</p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Wish List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishList.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => removeFromWishList(item.id)}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                aria-label="Remove from wishlist"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: item.currency,
                  }).format(Number(item.price))}
                </span>

                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishListPage; 