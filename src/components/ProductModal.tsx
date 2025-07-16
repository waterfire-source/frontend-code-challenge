import React from 'react';
import type { Product } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishList } from '../context/WishListContext';
import { FiX, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface Props {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const { addToWishList, wishList, removeFromWishList } = useWishList();

    if (!product || !isOpen) return null;

    const isWished = wishList.some((item) => item.id === product.id);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success('Added to cart!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleWishListToggle = () => {
        if (isWished) {
            removeFromWishList(product.id);
            toast.info('Removed from wishlist', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            addToWishList(product);
            toast.success('Added to wishlist!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-500/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
                >
                    <FiX className="w-6 h-6" />
                </button>

                {/* Product content */}
                <div className="p-6">
                    {/* Image */}
                    <div className="mb-6">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>

                    {/* Product info */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {product.title}
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                {new Intl.NumberFormat(undefined, {
                                    style: 'currency',
                                    currency: product.currency,
                                }).format(Number(product.price))}
                            </span>

                            <button
                                onClick={handleWishListToggle}
                                className={`p-3 rounded-full transition-colors ${isWished
                                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                                    }`}
                                aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                <FiHeart className={`w-6 h-6 ${isWished ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        {/* Action buttons */}
                        <div className="flex space-x-4 pt-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <FiShoppingCart className="w-5 h-5 mr-2" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal; 