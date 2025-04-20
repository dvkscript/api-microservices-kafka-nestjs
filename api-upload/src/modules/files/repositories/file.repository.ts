import { BaseRepository } from "src/libs/db/repository.base";
import { FileEntity } from "../entities/file.entity";

export class FileRepository extends BaseRepository<FileEntity> {
    protected getModel() {
        return FileEntity;
    }
}