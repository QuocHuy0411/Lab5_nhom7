# Cryptography Application

Ứng dụng mã hóa dữ liệu web-based cung cấp nhiều phương pháp mã hóa và giải mã khác nhau. Hỗ trợ mã hóa đối xứng (Symmetric), mã hóa bất đối xứng (Asymmetric), và các hàm hash.

## Mục Lục

- [Tính Năng](#tính-năng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Cách Chạy Ứng Dụng](#cách-chạy-ứng-dụng)
- [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Tác Giả](#tác-giả)
- [Giấy Phép](#giấy-phép)

## Tính Năng

### 1. **Mã Hóa Đối Xứng (Symmetric Encryption)**
- **DES (Data Encryption Standard)**
  - Mã hóa và giải mã sử dụng khóa 8 bytes (64-bit)
  
- **AES (Advanced Encryption Standard)**
  - Hỗ trợ ba kích thước khóa: 128-bit, 192-bit, 256-bit
  - Ba chế độ hoạt động:
    - **CBC** (Cipher Block Chaining) - khuyên dùng
    - **ECB** (Electronic Codebook)
    - **CFB** (Cipher Feedback)
  - Tự động tạo IV (Initialization Vector) hoặc tùy chỉnh
  - Lưu và sử dụng lại IV cho quá trình giải mã
  
- **3DES** (Triple DES)
  - Code có sẵn trong folder nhưng chưa tích hợp vào UI

### 2. **Mã Hóa Bất Đối Xứng (Asymmetric Encryption - RSA)**
- Tự động tạo cặp khóa RSA (khóa công khai và khóa bí mật)
- Mã hóa văn bản bằng khóa công khai
- Giải mã dữ liệu bằng khóa bí mật
- Sao chép kết quả mã hóa/giải mã vào clipboard
- Xử lý lỗi thời gian thực và xác thực dữ liệu

### 3. **Hàm Hash Functions**
- **MD5**
  - Tính toán mã hash MD5 (128-bit) từ văn bản đầu vào
  - Kết quả hiển thị ở dạng Hexadecimal
  
- **SHA256**
  - Tính toán mã hash SHA256 (256-bit) từ văn bản đầu vào
  - Kết quả hiển thị ở dạng Hexadecimal
  - Khuyên dùng cho bảo mật cao hơn

## Cấu Trúc Dự Án

```
Lab5_Nhom7/
├── index.html                           # File HTML chính
├── style.css                            # Tệp CSS styling
├── server.js                            # Server Node.js
├── README.md                            # Tài liệu này
├── 5_N23DCCN162_NguyenNgocQuocHuy/
│   ├── rsa.js                           # Logic mã hóa RSA
│   └── rsa-ui.js                        # Tương tác giao diện RSA
├── symmetric/
│   ├── des.js                           # Logic mã hóa DES
│   ├── aes.js                           # Logic mã hóa AES
│   └── 3des.js                          # Logic mã hóa 3DES (chưa dùng)
└── hash/
    ├── hash.js                          # Logic hàm Hash (MD5, SHA256)
    └── hash-ui.js                       # Tương tác giao diện Hash
```

## Cách Chạy Ứng Dụng

### Yêu Cầu
- Node.js phải được cài đặt trên hệ thống

### Các Bước

1. **Điều hướng đến thư mục dự án:**
   ```bash
   cd Lab5_Nhom7
   ```

2. **Khởi động server:**
   ```bash
   node server.js
   ```

3. **Mở trong trình duyệt:**
   - Truy cập `http://localhost:3000`

4. **Dừng server:**
   - Nhấn `Ctrl+C` trong terminal

## Hướng Dẫn Sử Dụng

### 1. **Mã Hóa Đối Xứng (Symmetric Encryption)**

**Các bước chung:**
- Chọn thuật toán: DES hoặc AES
- Tạo hoặc nhập khóa mã hóa
- Nhập dữ liệu cần mã hóa/giải mã
- Click "Encrypt" hoặc "Decrypt"

**Cho AES:**
1. Chọn kích thước khóa (128, 192, hoặc 256-bit)
2. Chọn chế độ hoạt động (CBC, ECB, CFB)
3. Nếu không phải ECB, tự động tạo IV hoặc cung cấp IV hiện có
4. Lưu IV từ lần mã hóa đầu tiên để sử dụng khi giải mã

**Cho DES:**
1. Khóa tự động là 8 bytes (64-bit)
2. Chỉ cần nhập dữ liệu và mã hóa/giải mã

### 2. **Mã Hóa Bất Đối Xứng (RSA)**

**Để mã hóa:**
1. Click "Auto-generate Key" để tạo cặp khóa
2. Nhập văn bản cần mã hóa vào "Input Data"
3. Click "Encrypt" để mã hóa bằng khóa công khai
4. Sao chép kết quả hoặc sử dụng cho giải mã

**Để giải mã:**
1. Dán văn bản đã mã hóa vào "Input Data"
2. Click "Decrypt" để giải mã bằng khóa bí mật
3. Xem kết quả giải mã trong vùng Output

### 3. **Hàm Hash Functions**

**Để tính hash:**
1. Chọn thuật toán: MD5 hoặc SHA256
2. Nhập văn bản cần tính hash
3. Click "Calculate" để tính giá trị hash
4. Kết quả hiển thị ở dạng Hexadecimal
5. Sao chép kết quả hoặc sử dụng cho mục đích khác

### 4. **Các Chức Năng Khác**
- **Copy Result**: Sao chép kết quả vào clipboard
- **Try Again**: Xóa các trường nhập liệu
- **Back**: Quay lại menu chính

## Công Nghệ Sử Dụng

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (HTTP Server)
- **Thư viện:** CryptoJS (mã hóa và hash)
- **Mã hóa:**
  - RSA (Asymmetric)
  - DES, AES, 3DES (Symmetric)
- **Hash Functions:**
  - MD5 (128-bit)
  - SHA256 (256-bit)

## Tác Giả

**Nhóm 7 - Lớp An toàn Hệ thống Thông tin - PTIT**

1. Nguyễn Ngọc Quốc Huy (N23DCCN162)
2. Nguyễn Lê Hoàng Học
3. Huỳnh Quốc Huy
4. Đặng Huy Hoàng
5. Sang Xuân Hùng

## Giấy Phép

Dự án này được phát triển cho mục đích giáo dục.
