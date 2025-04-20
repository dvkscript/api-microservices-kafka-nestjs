# API Text-to-Speech với Kafka

## Chú ý khi sử dụng
1. Hiện tại chỉ có thể build và chạy trên môi trường win32 (ưu tiên linux), Python 3.11

## Cài đặt

### Local
#### Sử dụng conda để tạo môi trường phù hợp
1. conda create -n text-to-speech-api python=3.11 -> tạo môi trường ảo
2. conda activate text-to-speech-api -> kích hoạt môi trường ảo
3. conda install pywin32 -> cài đặt win32 
4. python -m venv venv -> tạo môi trường ảo của dự án (khác với bên trên)
5. ./venv/Scripts/activate -> kích hoạt môi trường ảo | resource ./venv/Scripts/activate cho git bash
6. pip install -r requirements.txt -> cài đặt thư viện

## Cấu hình Kafka

Dự án sử dụng Kafka để xử lý các yêu cầu tạo giọng nói một cách bất đồng bộ. Bạn cần cấu hình các biến môi trường sau trong file `.env`:

```
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
KAFKA_CLIENT_ID=text-to-speech-client
KAFKA_GROUP_ID=text-to-speech-group
```

## Khởi động ứng dụng

1. Khởi động API server:
   ```
   uvicorn src.main:app --reload
   ```

2. Khởi động Kafka consumer service (trong một terminal khác):
   ```
   python src/services/run_consumer.py
   ```

## Sử dụng API

### Tạo giọng nói (bất đồng bộ)

```
POST /generate-voice
```

Yêu cầu sẽ được gửi đến Kafka và xử lý bất đồng bộ. Kết quả sẽ được lưu vào cache.

### Tạo giọng nói (đồng bộ)

```
POST /generate-voice?sync=true
```

API sẽ xử lý yêu cầu ngay lập tức và trả về file âm thanh.
