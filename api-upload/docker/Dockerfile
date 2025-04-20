# Dockerfile.dev

FROM node:20

# Cài đặt bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Làm việc tại thư mục dự án
WORKDIR /app

# Không copy code vì ta sẽ mount volume ở docker-compose
# COPY . .

# Cài dependencies mỗi khi container khởi động (dev)
CMD ["bun", "install", "--no-cache", "&&", "bun", "run", "start:dev"]
