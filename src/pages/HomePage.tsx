import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import type { Product } from '../hooks/useProducts';

const PRODUCTS_PER_PAGE = 10;

const HomePage: React.FC = () => {
    const { products, loading } = useProducts();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filtered = products.filter(
        (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

    const handleCardClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-96">
                <div className="text-lg text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <SearchBar value={search} onChange={setSearch} />
            {filtered.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                    No products found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {paginated.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>
            )}
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default HomePage; 