# Phát triển

Project được tạo bởi [Create React App](https://github.com/facebook/create-react-app).

## Các scripts

### `yarn start`

Start ứng dụng ở chế độ phát triển.\
Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng trong trình duyệt.

## Tham khảo

Xem thêm tại [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

# Triển khai

Project đi kèm một Dockerfile để triển khai ứng dụng.

## Hướng dẫn build
### Yêu cầu
- NodeJS v12.x
- Yarn

### Build
- `npm install -g yarn` (nếu chưa có)
- `yarn install`
- `yarn build`

## Tham số

Sau đây là danh sách các biến môi trường cần thiết lập khi chạy ứng dụng:

| Tên biến môi trường | Mô tả |
|---|---|
| API_BASE_URL | URL trỏ đến module API của hệ thống. Ví dụ: http://localhost:8080 |
