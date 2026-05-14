import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { formatPrice, getStockStatus } from '../../utils/helpers';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const product = getProduct(id);
  const [showDelete, setShowDelete] = useState(false);

  if (!product) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <div className="empty-state-title">Không tìm thấy sản phẩm</div>
        <div className="empty-state-desc">Sản phẩm này có thể đã bị xóa.</div>
        <Link to="/admin/products" className="btn btn-primary" style={{ marginTop: 24 }}>← Quay lại</Link>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.stock);

  const handleDelete = () => {
    deleteProduct(product.id);
    navigate('/admin/products');
  };

  return (
    <div className="product-detail">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <Link to="/admin/products" className="btn btn-ghost">← Quay lại danh sách</Link>
      </div>

      <div className="product-detail-grid">
        <div>
          <img
            className="product-detail-image"
            src={product.image}
            alt={product.name}
            onError={e => { e.target.src = 'https://via.placeholder.com/400?text=7-Eleven'; }}
          />
        </div>
        <div className="product-detail-content">
          <div className="product-detail-category">{product.category}</div>
          <h1 className="product-detail-name">{product.name}</h1>
          <div className="product-detail-price">{formatPrice(product.price)}</div>
          <p className="product-detail-desc">{product.description}</p>

          <div className="product-detail-meta">
            <div>
              <div className="meta-item-label">ID sản phẩm</div>
              <div className="meta-item-value">#{product.id}</div>
            </div>
            <div>
              <div className="meta-item-label">Danh mục</div>
              <div className="meta-item-value">{product.category}</div>
            </div>
            <div>
              <div className="meta-item-label">Tồn kho</div>
              <div className="meta-item-value">{product.stock} sản phẩm</div>
            </div>
            <div>
              <div className="meta-item-label">Trạng thái</div>
              <div className="meta-item-value">
                <span className={`badge badge-${stockStatus.className === 'in-stock' ? 'success' : stockStatus.className === 'low-stock' ? 'warning' : 'danger'}`}>
                  <span className="badge-dot" />
                  {stockStatus.label}
                </span>
              </div>
            </div>
          </div>

          <div className="product-detail-actions">
            <Link to={`/admin/products/${product.id}/edit`} className="btn btn-primary">✏️ Sửa sản phẩm</Link>
            <button className="btn btn-danger" onClick={() => setShowDelete(true)}>🗑️ Xóa</button>
          </div>
        </div>
      </div>

      {showDelete && (
        <div className="modal-overlay" onClick={() => setShowDelete(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Xác nhận xóa</h3>
              <button className="modal-close" onClick={() => setShowDelete(false)}>✕</button>
            </div>
            <div className="modal-body">
              Bạn có chắc chắn muốn xóa <strong>{product.name}</strong>? Hành động này không thể hoàn tác.
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDelete(false)}>Hủy</button>
              <button className="btn btn-danger" onClick={handleDelete}>Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
