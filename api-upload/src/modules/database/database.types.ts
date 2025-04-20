import { Transactionable } from "sequelize"

export type DatabaseOptionType = {
    transaction?: Transactionable["transaction"]
}