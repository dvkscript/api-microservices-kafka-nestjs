import { IsInt, IsMimeType, IsUUID, Max, Min } from "class-validator";

export class ImageDto implements Express.Multer.File {
    @IsUUID()
    fieldname: string; // ID của ảnh, phải là UUID

    @IsMimeType()
    mimetype: string; // Kiểm tra xem có phải file image không

    @IsInt()
    @Min(1)
    @Max(5 * 1024 * 1024) // Giới hạn file tối đa 5MB
    size: number;

    originalname: string; // Tên gốc của file
    buffer: Buffer; // Nội dung file

    encoding: string; // Kiểu encoding của file
    destination: string; // Đường dẫn lưu trữ file
    filename: string; // Tên file sau khi upload
    path: string; // Đường dẫn file
    stream: Express.Multer.File["stream"]; // Luồng đọc file

    constructor(partial: Partial<ImageDto>) {
        Object.assign(this, partial);
    }
}