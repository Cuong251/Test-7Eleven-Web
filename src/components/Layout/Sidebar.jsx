import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { cartCount } = useCart();
  const { orders } = useOrders();
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">7</div>
          <div className="sidebar-brand">
            7-Eleven <span>Store</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <div className="sidebar-section-title">🛒 Cửa hàng</div>
            <NavLink
              to="/shop"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link-icon">🏪</span>
              Mua sắm
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link-icon">🛒</span>
              Giỏ hàng
              {cartCount > 0 && <span className="sidebar-link-badge">{cartCount}</span>}
            </NavLink>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-title">⚙️ Quản trị</div>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link-icon">📦</span>
              Sản phẩm
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link-icon">📋</span>
              Đơn hàng
              {pendingOrders > 0 && <span className="sidebar-link-badge">{pendingOrders}</span>}
            </NavLink>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <div className="sidebar-avatar">A</div>
            <div>
              <div className="sidebar-user-name">Admin</div>
              <div className="sidebar-user-role">Quản trị viên</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
