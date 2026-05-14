import { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { formatPrice, formatDate, getStatusInfo } from '../../utils/helpers';

const statusOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xác nhận' },
  { value: 'confirmed', label: 'Đã xác nhận' },
  { value: 'delivered', label: 'Đã giao' },
  { value: 'cancelled', label: 'Đã hủy' },
];

export default function OrderList() {
  const { orders, updateOrderStatus } = useOrders();
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon blue">📋</div>
          <div>
            <div className="stat-card-value">{orders.length}</div>
            <div className="stat-card-label">Tổng đơn hàng</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon orange">⏳</div>
          <div>
            <div className="stat-card-value">{orders.filter(o => o.status === 'pending').length}</div>
            <div className="stat-card-label">Chờ xác nhận</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon green">✅</div>
          <div>
            <div className="stat-card-value">{orders.filter(o => o.status === 'delivered').length}</div>
            <div className="stat-card-label">Đã giao</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon green">💰</div>
          <div>
            <div className="stat-card-value">{formatPrice(totalRevenue)}</div>
            <div className="stat-card-label">Doanh thu</div>
          </div>
        </div>
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">Đơn hàng</h1>
          <p className="page-subtitle">Quản lý và theo dõi đơn hàng</p>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        <div className="filter-tabs">
          {statusOptions.map(opt => (
            <button key={opt.value}
              className={`filter-tab ${filterStatus === opt.value ? 'active' : ''}`}
              onClick={() => setFilterStatus(opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filteredOrders.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="stagger-children">
              {filteredOrders.map(order => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <tr key={order.id}>
                    <td><span style={{ fontWeight: 700, color: 'var(--color-primary-light)' }}>{order.id}</span></td>
                    <td>
                      <div className="order-customer-info">
                        <span className="order-customer-name">{order.customerName}</span>
                        <span className="order-customer-phone">{order.customerPhone}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>
                      {order.items.length} sản phẩm
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--color-accent-orange)' }}>
                      {formatPrice(order.total)}
                    </td>
                    <td>
                      <span className={`badge ${statusInfo.className}`}>
                        <span className="badge-dot" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                      {formatDate(order.createdAt)}
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn btn-ghost btn-sm" onClick={() => setSelectedOrder(order)}>👁️</button>
                        <select className="order-status-select"
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value)}>
                          <option value="pending">Chờ xác nhận</option>
                          <option value="confirmed">Đã xác nhận</option>
                          <option value="delivered">Đã giao</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-title">Không có đơn hàng</div>
          <div className="empty-state-desc">Chưa có đơn hàng nào phù hợp với bộ lọc.</div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className="modal-header">
              <h3 className="modal-title">Chi tiết đơn hàng {selectedOrder.id}</h3>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: 'var(--space-md)' }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{selectedOrder.customerName}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                  📞 {selectedOrder.customerPhone}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                  📍 {selectedOrder.customerAddress}
                </div>
              </div>
              <div className="order-items-list">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-qty">x{item.quantity}</span>
                    <span className="order-item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="order-total-row">
                <span>Tổng cộng</span>
                <span style={{ color: 'var(--color-accent-orange)' }}>{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
