import { Type } from "class-transformer";
import { IsUUID, ValidateNested } from "class-validator";
import { ImageUploadDto } from "src/modules/upload/dto/image.upload.dto";

export class CreateImageUploadKafkaDto {
    @IsUUID()
    userId: string;

    @ValidateNested()
    @Type(() => ImageUploadDto)
    image: ImageUploadDto;
}