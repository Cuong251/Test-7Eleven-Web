export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
};

export const getStockStatus = (stock) => {
  if (stock <= 0) return { label: 'Hết hàng', className: 'out-of-stock' };
  if (stock <= 20) return { label: 'Sắp hết', className: 'low-stock' };
  return { label: 'Còn hàng', className: 'in-stock' };
};

export const getStatusInfo = (status) => {
  const map = {
    pending: { label: 'Chờ xác nhận', className: 'badge-warning' },
    confirmed: { label: 'Đã xác nhận', className: 'badge-info' },
    delivered: { label: 'Đã giao', className: 'badge-success' },
    cancelled: { label: 'Đã hủy', className: 'badge-danger' },
  };
  return map[status] || { label: status, className: 'badge-neutral' };
};

export const generateOrderId = () => {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `ORD-${num}`;
};
