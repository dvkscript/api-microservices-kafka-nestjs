# Base image: Python 3.11 slim (Debian-based, phù hợp cho Linux)
FROM python:3.11-slim

# Environment variables
ENV APP_DIR=/app
WORKDIR ${APP_DIR}

# Cài các package cần thiết trước khi install Python packages
RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy file requirements và cài đặt Python packages
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ mã nguồn vào container
COPY . .

# Lệnh chạy server bằng uvicorn
CMD ["uvicorn", "src.main:app", "--host", "localhost", "--port", "4002"]
