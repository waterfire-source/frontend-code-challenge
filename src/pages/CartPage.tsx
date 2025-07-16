import React from 'react';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>
        <div className="text-center py-16">
          <FiShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {cart.map((item) => (
              <div key={item.id} className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Quantity: {item.quantity}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {new Intl.NumberFormat(undefined, {
                          style: 'currency',
                          currency: item.currency,
                        }).format(Number(item.price) * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal ({cart.length} items)</span>
                <span className="text-gray-900 dark:text-white">
                  {new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: cart[0]?.currency || 'USD',
                  }).format(total)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-green-600 dark:text-green-400">Free</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {new Intl.NumberFormat(undefined, {
                      style: 'currency',
                      currency: cart[0]?.currency || 'USD',
                    }).format(total)}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 