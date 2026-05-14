import { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/mockData';

const ProductContext = createContext();

const STORAGE_KEY = '7eleven_products';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tất cả');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === Number(id) ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== Number(id)));
  };

  const getProduct = (id) => products.find(p => p.id === Number(id));

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'Tất cả' || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <ProductContext.Provider value={{
      products, filteredProducts, searchTerm, setSearchTerm,
      filterCategory, setFilterCategory,
      addProduct, updateProduct, deleteProduct, getProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
