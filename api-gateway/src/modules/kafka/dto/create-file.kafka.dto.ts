import { IsUUID, ValidateNested } from "class-validator";

export class CreateFileKafkaDto {
    @IsUUID()
    objectId: string;

    @ValidateNested()
    file: Express.Multer.File;
}