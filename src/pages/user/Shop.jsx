import { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { formatPrice, getStockStatus } from '../../utils/helpers';
import { categories } from '../../data/mockData';

export default function Shop() {
  const { filteredProducts, searchTerm, setSearchTerm, filterCategory, setFilterCategory } = useProducts();
  const { addToCart, cartItems } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [sortBy, setSortBy] = useState('default');

  let sortedProducts = [...filteredProducts];
  if (sortBy === 'price-asc') sortedProducts.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') sortedProducts.sort((a, b) => b.price - a.price);
  if (sortBy === 'name') sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Cửa hàng <span className="gradient-text">7-Eleven</span></h1>
          <p className="page-subtitle">Khám phá các sản phẩm tiện lợi hàng ngày</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-bar" style={{ flex: 1, maxWidth: 360 }}>
          <span className="search-bar-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {categories.map(cat => (
            <button key={cat}
              className={`filter-tab ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
        <select className="form-input" value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ width: 'auto', minWidth: 150 }}>
          <option value="default">Mặc định</option>
          <option value="price-asc">Giá: Thấp → Cao</option>
          <option value="price-desc">Giá: Cao → Thấp</option>
          <option value="name">Tên A-Z</option>
        </select>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="shop-grid stagger-children">
          {sortedProducts.map(product => {
            const stockStatus = getStockStatus(product.stock);
            const inCart = cartItems.find(i => i.productId === product.id);
            const justAdded = addedId === product.id;

            return (
              <div key={product.id} className="product-card">
                <div className="product-card-image-wrapper">
                  <img className="product-card-image" src={product.image} alt={product.name}
                    onError={e => { e.target.src = 'https://via.placeholder.com/400x300?text=7-Eleven'; }} />
                  <span className="product-card-category">{product.category}</span>
                  <span className={`product-card-stock ${stockStatus.className}`}>{stockStatus.label}</span>
                </div>
                <div className="product-card-body">
                  <h3 className="product-card-name">{product.name}</h3>
                  <p className="product-card-desc">{product.description}</p>
                  <div className="product-card-footer">
                    <span className="product-card-price">{formatPrice(product.price)}</span>
                    <button
                      className="product-card-add-btn"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                      title={product.stock <= 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
                      style={justAdded ? { background: 'linear-gradient(135deg, #10B981, #059669)' } : {}}
                    >
                      {justAdded ? '✓' : inCart ? `+${inCart.quantity}` : '+'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">Không tìm thấy sản phẩm</div>
          <div className="empty-state-desc">Thử tìm kiếm với từ khóa khác.</div>
        </div>
      )}
    </div>
  );
}
