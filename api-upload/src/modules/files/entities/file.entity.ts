import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'files',
})
export class FileEntity extends Model<FileEntity> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    type: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: true,
    })
    size: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    format: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    url: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'object_id',
    })
    objectId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'storage_type',
    })
    storageType: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'user_id',
    })
    userId: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: 'created_at',
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: 'updated_at',
    })
    updatedAt: Date;
}