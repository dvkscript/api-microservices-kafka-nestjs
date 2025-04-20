import { IsDefined, IsNotEmptyObject, IsObject, IsUUID, ValidateNested } from "class-validator";
import { ImageDto } from "./image.dto";
import { Type } from "class-transformer";

export class UploadImageDto {
    @IsUUID()
    userId: string;

    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => ImageDto)
    image: ImageDto;

    constructor(partial: Partial<UploadImageDto>) {
        Object.assign(this, partial);
    }
}