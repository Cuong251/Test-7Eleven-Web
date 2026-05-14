import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const pageTitles = {
  '/shop': { title: 'Cửa hàng', subtitle: 'Khám phá sản phẩm tiện lợi' },
  '/cart': { title: 'Giỏ hàng', subtitle: 'Xem lại sản phẩm đã chọn' },
  '/checkout': { title: 'Thanh toán', subtitle: 'Hoàn tất đơn hàng' },
  '/admin/products': { title: 'Quản lý Sản phẩm', subtitle: 'Thêm, sửa, xóa sản phẩm' },
  '/admin/orders': { title: 'Quản lý Đơn hàng', subtitle: 'Xem và cập nhật đơn hàng' },
};

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const { cartCount } = useCart();

  const getPageInfo = () => {
    if (location.pathname.includes('/admin/products/') && location.pathname.includes('/edit')) {
      return { title: 'Sửa sản phẩm', subtitle: 'Cập nhật thông tin sản phẩm' };
    }
    if (location.pathname === '/admin/products/new') {
      return { title: 'Thêm sản phẩm', subtitle: 'Tạo sản phẩm mới' };
    }
    if (location.pathname.match(/\/admin\/products\/\d+$/)) {
      return { title: 'Chi tiết sản phẩm', subtitle: 'Xem thông tin sản phẩm' };
    }
    return pageTitles[location.pathname] || { title: '7-Eleven', subtitle: '' };
  };

  const pageInfo = getPageInfo();

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuClick}>☰</button>
        <div>
          <div className="header-title">{pageInfo.title}</div>
          {pageInfo.subtitle && <div className="header-subtitle">{pageInfo.subtitle}</div>}
        </div>
      </div>
      <div className="header-right">
        <Link to="/cart" className="btn btn-ghost cart-floating-badge">
          🛒
          {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
}
