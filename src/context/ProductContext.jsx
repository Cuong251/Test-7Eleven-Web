import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tất cả');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    try {
      const response = await api.post('/products', productData);
      setProducts(prev => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      throw error;
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const response = await api.put(`/products/${id}`, updates);
      setProducts(prev => prev.map(p => p.id === Number(id) ? response.data : p));
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== Number(id)));
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      throw error;
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
      products, filteredProducts, loading,
      searchTerm, setSearchTerm,
      filterCategory, setFilterCategory,
      addProduct, updateProduct, deleteProduct, getProduct,
      fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
