import { IsEnum, IsNumber, IsOptional, IsString, IsUrl, IsUUID, MaxLength, MinLength } from "class-validator";
import { FileStorageType } from "src/modules/shared/enum/storageType.file";
import { FileType } from "src/modules/shared/enum/type.file";

export class CreateFileImageDto {
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    name: string;

    @IsString()
    @MaxLength(50)
    @IsEnum(FileType)
    @IsOptional()
    type?: string;

    @IsNumber()
    size: number;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    format?: string;

    @IsUrl()
    url: string;

    @IsUUID()
    objectId: string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @IsEnum(FileStorageType)
    storageType: string;

    @IsUUID()
    userId: string;
}