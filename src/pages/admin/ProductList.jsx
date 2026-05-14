import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { formatPrice, getStockStatus } from '../../utils/helpers';
import { categories } from '../../data/mockData';

export default function ProductList() {
  const { filteredProducts, searchTerm, setSearchTerm, filterCategory, setFilterCategory, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
  );

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteProduct(deleteId);
        setDeleteId(null);
      } catch (error) {
        alert('Lỗi khi xóa sản phẩm!');
      }
    }
  };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon green">📦</div>
          <div>
            <div className="stat-card-value">{filteredProducts.length}</div>
            <div className="stat-card-label">Tổng sản phẩm</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon orange">⚠️</div>
          <div>
            <div className="stat-card-value">{filteredProducts.filter(p => p.stock <= 20 && p.stock > 0).length}</div>
            <div className="stat-card-label">Sắp hết hàng</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon red">🚫</div>
          <div>
            <div className="stat-card-value">{filteredProducts.filter(p => p.stock <= 0).length}</div>
            <div className="stat-card-label">Hết hàng</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon blue">📂</div>
          <div>
            <div className="stat-card-value">{categories.length - 1}</div>
            <div className="stat-card-label">Danh mục</div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Sản phẩm</h1>
          <p className="page-subtitle">Quản lý kho hàng cửa hàng</p>
        </div>
        <div className="page-actions">
          <Link to="/admin/products/new" className="btn btn-primary">
            ＋ Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        <div className="search-bar" style={{ flex: 1, maxWidth: 360 }}>
          <span className="search-bar-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tab ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => { setFilterCategory(cat); setCurrentPage(1); }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Giá</th>
                  <th>Tồn kho</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="stagger-children">
                {paginatedProducts.map(product => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="product-img-cell">
                          <img className="product-img-thumb" src={product.image} alt={product.name}
                            onError={e => { e.target.src = 'https://via.placeholder.com/44?text=7E'; }} />
                          <div className="product-img-info">
                            <span className="product-img-name">{product.name}</span>
                            <span className="product-img-sku">ID: {product.id}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-neutral">{product.category}</span></td>
                      <td style={{ fontWeight: 600, color: 'var(--color-accent-orange)' }}>
                        {formatPrice(product.price)}
                      </td>
                      <td>{product.stock}</td>
                      <td>
                        <span className={`badge badge-${stockStatus.className === 'in-stock' ? 'success' : stockStatus.className === 'low-stock' ? 'warning' : 'danger'}`}>
                          <span className="badge-dot" />
                          {stockStatus.label}
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/admin/products/${product.id}`)}>👁️</button>
                          <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/admin/products/${product.id}/edit`)}>✏️</button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-accent-red)' }} onClick={() => setDeleteId(product.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
              <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>›</button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <div className="empty-state-title">Không tìm thấy sản phẩm</div>
          <div className="empty-state-desc">Thử thay đổi bộ lọc hoặc thêm sản phẩm mới.</div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Xác nhận xóa</h3>
              <button className="modal-close" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="modal-body">
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Hủy</button>
              <button className="btn btn-danger" onClick={handleDelete}>Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
