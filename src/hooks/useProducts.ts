import { useEffect, useState } from 'react';

export interface Product {
    id: string;
    image: string;
    title: string;
    description: string;
    price: string;
    currency: string;
}

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/jagaad/frontend-test/main/mock-products.json')
            .then((res) => res.json())
            .then((data) => {
                const productsArray = Array.isArray(data.data) ? data.data : [];
                const withIds = productsArray.map((p: Product, i: number) => ({
                    ...p,
                    id: p.id || String(i),
                }));
                setProducts(withIds);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch products:', err);
                setProducts([]);
                setLoading(false);
            });
    }, []);

    return { products, loading };
};