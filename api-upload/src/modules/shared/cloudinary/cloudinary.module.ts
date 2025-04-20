import { Module } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryProvider } from "./cloudinary.provider";
import { ConfigService } from "../config/config.service";

@Module({
    imports: [],
    providers: [CloudinaryService, ConfigService, CloudinaryProvider],
    exports: [CloudinaryService, CloudinaryProvider]
})
export class CloudinaryModule { }