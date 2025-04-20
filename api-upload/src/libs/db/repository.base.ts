import { CreateOptions, DestroyOptions, Filterable, FindAndCountOptions, FindOptions, Identifier, ModelStatic, NonNullFindOptions, Transaction, UpdateOptions } from "sequelize";
import { Model } from "sequelize-typescript";

export abstract class BaseRepository<T extends Model> {
    protected model: ModelStatic<T>;

    constructor() {
        this.model = this.getModel();
    }

    protected abstract getModel(): ModelStatic<T>;

    create(data: Partial<T>, Condition?: CreateOptions<T>) {
        return this.model.create(data as any, { ...Condition });
    }

    update(where: UpdateOptions<T>["where"], data: Partial<T>, condition?: UpdateOptions<T>) {
        return this.model.update(
            data,
            {
                ...condition,
                where
            }
        );
    }

    delete(where: DestroyOptions<T>["where"], condition?: Omit<DestroyOptions<T>, "where">) {
        return this.model.destroy({
            ...condition,
            where,
        })
    }

    findAll(condition?: FindOptions<T>) {
        return this.model.findAll({ ...condition });
    }

    findOne(where: FindOptions<T>["where"], condition?: Omit<FindOptions<T>, "where">) {
        return this.model.findOne({
            ...condition,
            where
        })
    }

    findByPk(id: Identifier, condition?: NonNullFindOptions<T>) {
        return this.model.findByPk(id, { ...condition });
    }

    findOneCreate(where: Filterable<T>["where"], newData: Record<string, any>, condition?: Omit<Filterable<T>, "where" | "defaults">) {
        return this.model.findOrCreate({
            ...condition,
            where,
            defaults: newData as any
        })
    }

    findAndCountAll(condition?: FindAndCountOptions<T>) {
        return this.model.findAndCountAll(condition);
    }
}
