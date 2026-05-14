import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const API_URL = 'http://localhost:8080/api/products';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tất cả');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products', err));
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      const newProduct = await res.json();
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const updatedProduct = await res.json();
      setProducts(prev => prev.map(p => p.id === Number(id) ? updatedProduct : p));
    } catch (err) {
      console.error('Failed to update product', err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p.id !== Number(id)));
    } catch (err) {
      console.error('Failed to delete product', err);
    }
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
