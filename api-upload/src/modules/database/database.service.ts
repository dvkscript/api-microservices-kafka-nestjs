import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { SEQUELIZE } from "./database.di-tokens";

@Injectable()
export class DatabaseService {
    constructor(
        @Inject(SEQUELIZE)
        private readonly sequelize: Sequelize
    ) { }

    async transaction<R>(callback: (t: Transaction) => Promise<R>): Promise<R> {
        const transaction = await this.sequelize.transaction({
            autocommit: true,
        });
        try {
            const result = await callback(transaction);
            await transaction.commit(); 
            return result;
        } catch (error) {
            await transaction.rollback();
            throw new HttpException("Invalid Server Error", HttpStatus.INTERNAL_SERVER_ERROR, {
                description: error.message || "Transaction failed"
            });
        }
    }
}