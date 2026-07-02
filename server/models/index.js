import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import UserModel from './user.js';
import FinanceSummaryModel from './financeSummary.js';
import TransactionModel from './transaction.js';

export const User = UserModel(sequelize, DataTypes);
export const FinanceSummary = FinanceSummaryModel(sequelize, DataTypes);
export const Transaction = TransactionModel(sequelize, DataTypes);

export { sequelize };
