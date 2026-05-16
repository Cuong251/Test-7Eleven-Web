import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Shop from './pages/user/Shop';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import ProductList from './pages/admin/ProductList';
import ProductDetail from './pages/admin/ProductDetail';
import ProductForm from './pages/admin/ProductForm';
import OrderList from './pages/admin/OrderList';

import './styles/index.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/admin.css';
import './styles/shop.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/shop" replace />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="admin/products" element={<ProductList />} />
          <Route path="admin/products/new" element={<ProductForm />} />
          <Route path="admin/products/:id" element={<ProductDetail />} />
          <Route path="admin/products/:id/edit" element={<ProductForm />} />
          <Route path="admin/orders" element={<OrderList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
