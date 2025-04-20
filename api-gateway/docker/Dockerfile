FROM node:20
# Cài đặt bun
RUN curl -fsSL https://bun.sh/install | bash

# Thiết lập bun vào PATH
ENV PATH="/root/.bun/bin:${PATH}"
WORKDIR /app
COPY . .
RUN bun install
CMD ["bun", "run", "start:dev"]
