import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishListProvider } from './context/WishListContext';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import WishListPage from './pages/WishListPage';
import CartIcon from './components/CartIcon';
import WishListIcon from './components/WishListIcon';
import DarkModeToggle from './components/DarkModeToggle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <Router>
    <CartProvider>
      <WishListProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <ToastContainer />
          <header className="sticky top-0 z-20 flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="text-xl font-bold tracking-tight font-sans text-gray-900 dark:text-white">
              E-Shop
            </Link>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <Link to="/wishlist" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <WishListIcon />
              </Link>
              <Link to="/cart" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                <CartIcon />
              </Link>
            </div>
          </header>
          <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishListPage />} />
            </Routes>
          </main>
        </div>
      </WishListProvider>
    </CartProvider>
  </Router>
);

export default App;
