import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>>{
    declare taskId: number;
    declare title: string;
    declare completed: boolean;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function TaskFactory(sequelize: Sequelize) {
    Task.init({
        taskId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        tableName: 'task',
        sequelize
    });
}

