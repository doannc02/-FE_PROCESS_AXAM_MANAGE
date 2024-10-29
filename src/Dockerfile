# Sử dụng node image cho container
FROM node:18-alpine

# Tạo thư mục ứng dụng
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Sao chép mã nguồn
COPY . .

# Build dự án
RUN npm run build

# Khởi chạy ứng dụng
CMD ["npm", "run", "start"]
