## Cấu Trúc Thư Mục Dự Án (Project Structure)

```text
Test-7Eleven-Web/
├── backend/                   # Mã nguồn Spring Boot Backend
│   ├── src/main/java/...      # Java packages (controller, model, repository, config)
│   ├── src/main/resources/    # Cấu hình application.properties
│   ├── Dockerfile             # Multi-stage Dockerfile cho Backend
│   └── build.gradle           # Cấu hình dự án Gradle
├── frontend/                  # Mã nguồn React Frontend
│   ├── src/
│   │   ├── components/        # Các thành phần tái sử dụng (Pagination, Navbar, v.v.)
│   │   ├── context/           # Quản lý Global State (CartContext)
│   │   ├── pages/             # Các màn hình chính (Admin: Product/Order; User: Shop/Cart/Checkout)
│   │   ├── services/          # Các hàm gọi API kết nối backend (axios)
│   │   └── styles/            # File CSS tùy chỉnh
│   ├── Dockerfile             # Multi-stage Dockerfile cho Frontend (sử dụng Nginx)
│   ├── nginx.conf             # Cấu hình Nginx
│   └── package.json           # Danh sách dependencies của Node.js
├── docker-compose.yml         # File Docker Compose cấu hình toàn bộ hệ thống
└── README.md                  # Tài liệu hướng dẫn (File này)
```

---

## Hướng Dẫn Cài Đặt và Khởi Chạy

Bạn có thể chạy dự án này bằng một trong hai cách dưới đây:
### Cách 1: Chạy bằng Docker Compose
Yêu cầu hệ thống đã cài đặt sẵn **Docker** và ứng dụng **Docker Desktop** đang hoạt động.

1. **Mở Terminal và di chuyển vào thư mục dự án:**
   ```bash
   cd e:\Test-7Eleven-Web
   ```

2. **Khởi chạy toàn bộ hệ thống bằng Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```

3. **Truy cập các dịch vụ:**
   * **Giao diện người dùng (Frontend):** [http://localhost:5173](http://localhost:5173)
   * **Giao diện API (Backend REST API):** [http://localhost:8081/api/products](http://localhost:8081/api/products)
   * **PostgreSQL Database Port:** `5434` (được map từ cổng `5432` của container database ra máy local để tránh xung đột với các phiên bản PostgreSQL cài sẵn trên máy)

4. **Dừng hệ thống:**
   ```bash
   docker-compose down
   ```

---

### Cách 2: Chạy thủ công trên môi trường Local

#### Bước 1: Chuẩn bị Cơ sở dữ liệu PostgreSQL
1. Tạo một cơ sở dữ liệu mới trong PostgreSQL của bạn có tên là `seven_eleven_db`.
2. Đảm bảo PostgreSQL chạy ở cổng `5434` (hoặc cổng mặc định `5432` của bạn).

##### Thông số kết nối Database chi tiết:

| Thông số | Chạy Local (Thủ công) | Chạy Docker Compose |
| :--- | :--- | :--- |
| **Host** | `localhost` | `db` (nội bộ mạng Docker) / `localhost` (kết nối từ ngoài máy) |
| **Port** | `5434` (hoặc `5432` tùy cấu hình) | `5432` (nội bộ container) / `5434` (cổng được map ra ngoài máy) |
| **Database Name** | `seven_eleven_db` | `seven_eleven_db` |
| **Username** | `postgres` | `postgres` |
| **Password** | `1234` (hoặc mật khẩu của bạn) | `1234` |
| **Connection URL** | `jdbc:postgresql://localhost:5434/seven_eleven_db` | `jdbc:postgresql://db:5432/seven_eleven_db` |
| **Driver Class** | `org.postgresql.Driver` | `org.postgresql.Driver` |

#### Bước 2: Khởi chạy Backend (Spring Boot)
1. Truy cập vào thư mục `backend`:
   ```bash
   cd backend
   ```
2. Mở file `src/main/resources/application.properties` và chỉnh sửa tên đăng nhập/mật khẩu PostgreSQL của bạn tại:
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   ```
3. Chạy ứng dụng bằng Gradle Wrapper:
   * Trên hệ điều hành **Windows**:
     ```bash
     .\gradlew.bat bootRun
     ```
   * Trên hệ điều hành **macOS/Linux**:
     ```bash
     ./gradlew bootRun
     ```
4. Backend sẽ được khởi chạy tại cổng [http://localhost:8081](http://localhost:8081). Sau khi chạy lần đầu, Spring Boot sẽ tự tạo bảng và tự động seed 12 sản phẩm và 2 đơn đặt hàng mẫu vào database.

#### Bước 3: Khởi chạy Frontend (React)
1. Mở một cửa sổ Terminal mới và di chuyển vào thư mục `frontend`:
   ```bash
   cd frontend
   ```
2. Cài đặt các gói thư viện Node.js:
   ```bash
   npm install
   ```
3. Khởi chạy server phát triển của Vite:
   ```bash
   npm run dev
   ```
4. Frontend sẽ hoạt động tại cổng [http://localhost:5173](http://localhost:5173).

---

