package com.seveneleven.config;

import com.seveneleven.model.Order;
import com.seveneleven.model.OrderItem;
import com.seveneleven.model.Product;
import com.seveneleven.repository.OrderRepository;
import com.seveneleven.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner initData(ProductRepository productRepository, OrderRepository orderRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                List<Product> products = Arrays.asList(
                        new Product(null, "Coca-Cola Classic 330ml", "Đồ uống", 12000.0, 150, "Nước ngọt có ga Coca-Cola hương vị cổ điển, lon 330ml.", "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop"),
                        new Product(null, "Pepsi lon 330ml", "Đồ uống", 11000.0, 120, "Nước ngọt có ga Pepsi, hương vị tươi mát, lon 330ml.", "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=400&h=400&fit=crop"),
                        new Product(null, "Trà xanh Không Độ 455ml", "Đồ uống", 10000.0, 200, "Trà xanh tự nhiên, thanh mát, không đường. Chai 455ml tiện lợi.", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop"),
                        new Product(null, "Cà phê sữa Highlands", "Đồ uống", 29000.0, 80, "Cà phê sữa đá pha sẵn từ Highlands Coffee, hương vị đậm đà.", "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop"),
                        new Product(null, "Bánh mì Sandwich Thịt Nguội", "Snacks", 25000.0, 30, "Bánh mì sandwich với thịt nguội, rau xà lách và sốt mayonnaise.", "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop"),
                        new Product(null, "Onigiri cá ngừ", "Snacks", 22000.0, 45, "Cơm nắm Nhật Bản nhân cá ngừ mayonnaise, bọc rong biển.", "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=400&fit=crop"),
                        new Product(null, "Lay's khoai tây vị Tự nhiên 95g", "Snacks", 18000.0, 100, "Snack khoai tây chiên Lay's vị tự nhiên, giòn tan, gói 95g.", "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop"),
                        new Product(null, "Cơm hộp Gà Teriyaki", "Thực phẩm", 45000.0, 20, "Cơm hộp với gà chiên sốt teriyaki, rau củ và cơm trắng.", "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=400&fit=crop"),
                        new Product(null, "Mì ly Hảo Hảo tôm chua cay", "Thực phẩm", 8000.0, 300, "Mì ly ăn liền Hảo Hảo hương tôm chua cay, tiện lợi nhanh chóng.", "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=400&fit=crop"),
                        new Product(null, "Xúc xích Đức Việt", "Thực phẩm", 15000.0, 60, "Xúc xích hun khói Đức Việt, hương vị thơm ngon, ăn liền.", "https://images.unsplash.com/photo-1587536849024-daaa4a417b16?w=400&h=400&fit=crop"),
                        new Product(null, "Pocky Socola 45g", "Bánh kẹo", 20000.0, 90, "Bánh que Pocky phủ socola, hộp 45g. Snack yêu thích của giới trẻ.", "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400&h=400&fit=crop"),
                        new Product(null, "KitKat thanh 2F", "Bánh kẹo", 10000.0, 110, "Bánh xốp KitKat phủ socola sữa, thanh 2 finger.", "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=400&fit=crop")
                );
                productRepository.saveAll(products);
            }

            if (orderRepository.count() == 0) {
                Order order1 = new Order();
                order1.setId("ORD-001");
                order1.setCustomerName("Nguyễn Văn An");
                order1.setCustomerPhone("0901234567");
                order1.setCustomerAddress("123 Nguyễn Huệ, Q.1, TP.HCM");
                order1.setTotal(61000.0);
                order1.setStatus("delivered");
                order1.setCreatedAt(LocalDateTime.now().minusDays(2));
                
                OrderItem item1 = new OrderItem(null, order1, 1L, "Coca-Cola Classic 330ml", 12000.0, 3);
                OrderItem item2 = new OrderItem(null, order1, 5L, "Bánh mì Sandwich Thịt Nguội", 25000.0, 1);
                order1.setItems(Arrays.asList(item1, item2));

                Order order2 = new Order();
                order2.setId("ORD-002");
                order2.setCustomerName("Trần Thị Bình");
                order2.setCustomerPhone("0912345678");
                order2.setCustomerAddress("456 Lê Lợi, Q.3, TP.HCM");
                order2.setTotal(110000.0);
                order2.setStatus("confirmed");
                order2.setCreatedAt(LocalDateTime.now().minusDays(1));

                OrderItem item3 = new OrderItem(null, order2, 8L, "Cơm hộp Gà Teriyaki", 45000.0, 2);
                OrderItem item4 = new OrderItem(null, order2, 3L, "Trà xanh Không Độ 455ml", 10000.0, 2);
                order2.setItems(Arrays.asList(item3, item4));

                orderRepository.saveAll(Arrays.asList(order1, order2));
            }
        };
    }
}
