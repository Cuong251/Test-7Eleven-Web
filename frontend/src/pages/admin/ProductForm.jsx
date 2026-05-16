import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { formatPrice, transformUnsplashUrl } from '../../utils/helpers';
import { categories } from '../../data/mockData';

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { getProduct, addProduct, updateProduct } = useProducts();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', description: '', price: '', category: 'Đồ uống',
    stock: '', image: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      const product = getProduct(id);
      if (product) {
        setForm({
          name: product.name,
          description: product.description,
          price: String(product.price),
          category: product.category,
          stock: String(product.stock),
          image: product.image || '',
        });
      } else {
        navigate('/admin/products');
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'image' ? transformUnsplashUrl(value) : value;
    setForm(prev => ({ ...prev, [name]: finalValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Vui lòng nhập tên sản phẩm';
    if (!form.price || Number(form.price) <= 0) errs.price = 'Giá phải lớn hơn 0';
    if (!form.stock || Number(form.stock) < 0) errs.stock = 'Số lượng không hợp lệ';
    if (!form.description.trim()) errs.description = 'Vui lòng nhập mô tả';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const productData = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      stock: Number(form.stock),
      image: form.image.trim() || 'https://via.placeholder.com/400?text=7-Eleven',
    };

    try {
      if (isEdit) {
        await updateProduct(id, productData);
        navigate(`/admin/products/${id}`);
      } else {
        const newProduct = await addProduct(productData);
        navigate(`/admin/products/${newProduct.id}`);
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi lưu sản phẩm!');
    }
  };

  const productCategories = categories.filter(c => c !== 'Tất cả');

  return (
    <div className="product-form">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <Link to="/admin/products" className="btn btn-ghost">← Quay lại danh sách</Link>
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h1>
          <p className="page-subtitle">{isEdit ? 'Cập nhật thông tin sản phẩm' : 'Điền thông tin để tạo sản phẩm mới'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="product-form-card">
          <div className="product-form-section">
            <h3 className="product-form-section-title">Thông tin cơ bản</h3>
            <div className="form-grid">
              <div className="form-group form-full">
                <label className="form-label">Tên sản phẩm *</label>
                <input className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="VD: Coca-Cola Classic 330ml" />
                {errors.name && <span className="form-error-text">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Danh mục *</label>
                <select className="form-input" name="category" value={form.category} onChange={handleChange}>
                  {productCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Giá (VND) *</label>
                <input className={`form-input ${errors.price ? 'form-input-error' : ''}`}
                  type="number" name="price" value={form.price} onChange={handleChange}
                  placeholder="VD: 12000" />
                {errors.price && <span className="form-error-text">{errors.price}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Số lượng tồn kho *</label>
                <input className={`form-input ${errors.stock ? 'form-input-error' : ''}`}
                  type="number" name="stock" value={form.stock} onChange={handleChange}
                  placeholder="VD: 100" />
                {errors.stock && <span className="form-error-text">{errors.stock}</span>}
              </div>
              <div className="form-group form-full">
                <label className="form-label">Mô tả *</label>
                <textarea className={`form-input ${errors.description ? 'form-input-error' : ''}`}
                  name="description" value={form.description} onChange={handleChange}
                  placeholder="Mô tả chi tiết sản phẩm..." />
                {errors.description && <span className="form-error-text">{errors.description}</span>}
              </div>
            </div>
          </div>

          <div className="product-form-section">
            <h3 className="product-form-section-title">Hình ảnh</h3>
            <div className="form-group">
              <label className="form-label">URL hình ảnh</label>
              <input className="form-input" name="image" value={form.image} onChange={handleChange}
                placeholder="https://example.com/image.jpg" />
              {form.image && (
                <img className="image-preview" src={form.image} alt="Preview"
                  onError={e => { e.target.style.display = 'none'; }} />
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-lg)' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            {isEdit ? '💾 Lưu thay đổi' : '＋ Tạo sản phẩm'}
          </button>
          <Link to="/admin/products" className="btn btn-secondary btn-lg">Hủy</Link>
        </div>
      </form>
    </div>
  );
}
