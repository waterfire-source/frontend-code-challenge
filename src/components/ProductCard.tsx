import React from 'react';
import type { Product } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishList } from '../context/WishListContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    product: Product;
    onCardClick: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onCardClick }) => {
    const { addToCart } = useCart();
    const { addToWishList, wishList, removeFromWishList } = useWishList();
    const isWished = wishList.some((item) => item.id === product.id);

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        onCardClick(product);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
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

    const handleWishListToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
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
        <div
            className="
        bg-white dark:bg-gray-800
        rounded-lg shadow-md p-4 flex flex-col
        transition-transform duration-200
        hover:shadow-xl hover:scale-105
        active:scale-95
        cursor-pointer
        group
      "
            onClick={handleCardClick}
        >
            <img
                src={product.image}
                alt={product.title}
                className="h-48 object-cover rounded mb-3 border transition-transform duration-200 group-hover:scale-105"
            />
            <h2 className="font-semibold text-lg mb-1 line-clamp-1 text-gray-900 dark:text-white">
                {product.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                {product.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                    {new Intl.NumberFormat(undefined, {
                        style: 'currency',
                        currency: product.currency,
                    }).format(Number(product.price))}
                </span>
                <button
                    onClick={handleWishListToggle}
                    className={`ml-2 text-2xl ${isWished ? 'text-red-500' : 'text-gray-400'} transition-colors`}
                    aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    ♥
                </button>
            </div>
            <button
                onClick={handleAddToCart}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
