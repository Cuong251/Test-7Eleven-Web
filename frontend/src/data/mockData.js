export const categories = ['Tất cả', 'Đồ uống', 'Snacks', 'Thực phẩm', 'Bánh kẹo'];

export const initialProducts = [
  {
    id: 1, name: 'Coca-Cola Classic 330ml', category: 'Đồ uống',
    price: 12000, stock: 150,
    description: 'Nước ngọt có ga Coca-Cola hương vị cổ điển, lon 330ml. Thức uống giải khát hoàn hảo cho mọi dịp.',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop'
  },
  {
    id: 2, name: 'Pepsi lon 330ml', category: 'Đồ uống',
    price: 11000, stock: 120,
    description: 'Nước ngọt có ga Pepsi, hương vị tươi mát, lon 330ml.',
    image: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=400&h=400&fit=crop'
  },
  {
    id: 3, name: 'Trà xanh Không Độ 455ml', category: 'Đồ uống',
    price: 10000, stock: 200,
    description: 'Trà xanh tự nhiên, thanh mát, không đường. Chai 455ml tiện lợi.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop'
  },
  {
    id: 4, name: 'Cà phê sữa Highlands', category: 'Đồ uống',
    price: 29000, stock: 80,
    description: 'Cà phê sữa đá pha sẵn từ Highlands Coffee, hương vị đậm đà.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop'
  },
  {
    id: 5, name: 'Bánh mì Sandwich Thịt Nguội', category: 'Snacks',
    price: 25000, stock: 30,
    description: 'Bánh mì sandwich với thịt nguội, rau xà lách và sốt mayonnaise.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop'
  },
  {
    id: 6, name: 'Onigiri cá ngừ', category: 'Snacks',
    price: 22000, stock: 45,
    description: 'Cơm nắm Nhật Bản nhân cá ngừ mayonnaise, bọc rong biển.',
    image: 'https://images.unsplash.com/photo-1567019395803-0946tried?w=400&h=400&fit=crop'
  },
  {
    id: 7, name: 'Lay\'s khoai tây vị Tự nhiên 95g', category: 'Snacks',
    price: 18000, stock: 100,
    description: 'Snack khoai tây chiên Lay\'s vị tự nhiên, giòn tan, gói 95g.',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop'
  },
  {
    id: 8, name: 'Cơm hộp Gà Teriyaki', category: 'Thực phẩm',
    price: 45000, stock: 20,
    description: 'Cơm hộp với gà chiên sốt teriyaki, rau củ và cơm trắng.',
    image: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=400&h=400&fit=crop'
  },
  {
    id: 9, name: 'Mì ly Hảo Hảo tôm chua cay', category: 'Thực phẩm',
    price: 8000, stock: 300,
    description: 'Mì ly ăn liền Hảo Hảo hương tôm chua cay, tiện lợi nhanh chóng.',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=400&fit=crop'
  },
  {
    id: 10, name: 'Xúc xích Đức Việt', category: 'Thực phẩm',
    price: 15000, stock: 60,
    description: 'Xúc xích hun khói Đức Việt, hương vị thơm ngon, ăn liền.',
    image: 'https://images.unsplash.com/photo-1587536849024-daaa4a417b16?w=400&h=400&fit=crop'
  },
  {
    id: 11, name: 'Pocky Socola 45g', category: 'Bánh kẹo',
    price: 20000, stock: 90,
    description: 'Bánh que Pocky phủ socola, hộp 45g. Snack yêu thích của giới trẻ.',
    image: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400&h=400&fit=crop'
  },
  {
    id: 12, name: 'KitKat thanh 2F', category: 'Bánh kẹo',
    price: 10000, stock: 110,
    description: 'Bánh xốp KitKat phủ socola sữa, thanh 2 finger.',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=400&fit=crop'
  },
];

export const initialOrders = [
  {
    id: 'ORD-001', customerName: 'Nguyễn Văn An', customerPhone: '0901234567',
    customerAddress: '123 Nguyễn Huệ, Q.1, TP.HCM',
    items: [
      { productId: 1, name: 'Coca-Cola Classic 330ml', price: 12000, quantity: 3 },
      { productId: 5, name: 'Bánh mì Sandwich Thịt Nguội', price: 25000, quantity: 1 },
    ],
    total: 61000, status: 'delivered', createdAt: '2026-05-12T10:30:00'
  },
  {
    id: 'ORD-002', customerName: 'Trần Thị Bình', customerPhone: '0912345678',
    customerAddress: '456 Lê Lợi, Q.3, TP.HCM',
    items: [
      { productId: 8, name: 'Cơm hộp Gà Teriyaki', price: 45000, quantity: 2 },
      { productId: 3, name: 'Trà xanh Không Độ 455ml', price: 10000, quantity: 2 },
    ],
    total: 110000, status: 'confirmed', createdAt: '2026-05-13T14:15:00'
  },
  {
    id: 'ORD-003', customerName: 'Lê Hoàng Cường', customerPhone: '0923456789',
    customerAddress: '789 Pasteur, Q.1, TP.HCM',
    items: [
      { productId: 11, name: 'Pocky Socola 45g', price: 20000, quantity: 5 },
      { productId: 12, name: 'KitKat thanh 2F', price: 10000, quantity: 3 },
      { productId: 4, name: 'Cà phê sữa Highlands', price: 29000, quantity: 1 },
    ],
    total: 159000, status: 'pending', createdAt: '2026-05-14T08:00:00'
  },
];
