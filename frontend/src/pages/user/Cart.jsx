import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🛒</div>
        <div className="empty-state-title">Giỏ hàng trống</div>
        <div className="empty-state-desc">Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm.</div>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: 24 }}>🏪 Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Giỏ hàng</h1>
          <p className="page-subtitle">{cartCount} sản phẩm trong giỏ</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost" onClick={clearCart}>🗑️ Xóa tất cả</button>
        </div>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.productId} className="cart-item">
              <img className="cart-item-image" src={item.image} alt={item.name}
                onError={e => { e.target.src = 'https://via.placeholder.com/80?text=7E'; }} />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">{formatPrice(item.price)}</div>
              </div>
              <div className="cart-item-actions">
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.productId)}>✕</button>
              </div>
              <div className="cart-item-subtotal">{formatPrice(item.price * item.quantity)}</div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3 className="cart-summary-title">Tóm tắt đơn hàng</h3>
          <div className="cart-summary-row">
            <span>Số lượng sản phẩm</span>
            <span>{cartCount}</span>
          </div>
          <div className="cart-summary-row">
            <span>Tạm tính</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Phí vận chuyển</span>
            <span style={{ color: 'var(--color-primary-light)' }}>Miễn phí</span>
          </div>
          <div className="cart-summary-total">
            <span>Tổng cộng</span>
            <span className="cart-summary-total-price">{formatPrice(cartTotal)}</span>
          </div>
          <Link to="/checkout" className="btn btn-orange btn-lg">
            Tiến hành thanh toán →
          </Link>
          <Link to="/shop" className="btn btn-secondary" style={{ width: '100%', marginTop: 8 }}>
            ← Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
