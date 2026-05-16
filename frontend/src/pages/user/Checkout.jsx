import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { formatPrice } from '../../utils/helpers';

export default function Checkout() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(null);

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🛒</div>
        <div className="empty-state-title">Giỏ hàng trống</div>
        <div className="empty-state-desc">Vui lòng thêm sản phẩm trước khi thanh toán.</div>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: 24 }}>🏪 Đi mua sắm</Link>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="order-success">
        <div className="order-success-icon">✓</div>
        <h2 className="order-success-title">Đặt hàng thành công!</h2>
        <p className="order-success-desc">Cảm ơn bạn đã mua sắm tại 7-Eleven. Đơn hàng của bạn đang được xử lý.</p>
        <div className="order-success-id">{orderSuccess.id}</div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop" className="btn btn-primary">🏪 Tiếp tục mua sắm</Link>
          <Link to="/admin/orders" className="btn btn-secondary">📋 Xem đơn hàng</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Vui lòng nhập họ tên';
    if (!form.phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^0\d{9}$/.test(form.phone.trim())) errs.phone = 'Số điện thoại không hợp lệ';
    if (!form.address.trim()) errs.address = 'Vui lòng nhập địa chỉ';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const order = await createOrder(form, cartItems, cartTotal);
      clearCart();
      setOrderSuccess(order);
    } catch (error) {
      alert('Lỗi khi đặt hàng!');
    }
  };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <Link to="/cart" className="btn btn-ghost">← Quay lại giỏ hàng</Link>
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">Thanh toán</h1>
          <p className="page-subtitle">Hoàn tất thông tin để đặt hàng</p>
        </div>
      </div>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit}>
          <div className="checkout-form-card">
            <h3 className="checkout-section-title">Thông tin giao hàng</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div className="form-group">
                <label className="form-label">Họ và tên *</label>
                <input className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="VD: Nguyễn Văn A" />
                {errors.name && <span className="form-error-text">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Số điện thoại *</label>
                <input className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                  name="phone" value={form.phone} onChange={handleChange}
                  placeholder="VD: 0901234567" />
                {errors.phone && <span className="form-error-text">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Địa chỉ giao hàng *</label>
                <textarea className={`form-input ${errors.address ? 'form-input-error' : ''}`}
                  name="address" value={form.address} onChange={handleChange}
                  placeholder="VD: 123 Nguyễn Huệ, Q.1, TP.HCM" style={{ minHeight: 80 }} />
                {errors.address && <span className="form-error-text">{errors.address}</span>}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-orange btn-lg" style={{ width: '100%', marginTop: 'var(--space-lg)' }}>
            ✓ Xác nhận đặt hàng — {formatPrice(cartTotal)}
          </button>
        </form>

        <div className="cart-summary">
          <h3 className="cart-summary-title">Đơn hàng ({cartCount} SP)</h3>
          <div className="checkout-items">
            {cartItems.map(item => (
              <div key={item.productId} className="checkout-item">
                <img className="checkout-item-image" src={item.image} alt={item.name}
                  onError={e => { e.target.src = 'https://via.placeholder.com/48?text=7E'; }} />
                <span className="checkout-item-name">{item.name}</span>
                <span className="checkout-item-qty">x{item.quantity}</span>
                <span className="checkout-item-price">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="cart-summary-total">
            <span>Tổng cộng</span>
            <span className="cart-summary-total-price">{formatPrice(cartTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
