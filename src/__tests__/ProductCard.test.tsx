import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { CartProvider } from '../context/CartContext';
import { WishListProvider } from '../context/WishListContext';

const product = {
    id: '1',
    image: 'https://via.placeholder.com/150',
    title: 'Test Product',
    description: 'A test product',
    price: '10.00',
    currency: 'USD',
};

describe('ProductCard', () => {
    it('renders product info', () => {
        render(
            <CartProvider>
                <WishListProvider>
                    <ProductCard product={product} onCardClick={() => { }} />
                </WishListProvider>
            </CartProvider>
        );
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('A test product')).toBeInTheDocument();
        expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    it('can add to cart', () => {
        render(
            <CartProvider>
                <WishListProvider>
                    <ProductCard product={product} onCardClick={() => { }} />
                </WishListProvider>
            </CartProvider>
        );
        fireEvent.click(screen.getByText('Add to Cart'));
    });
}); 