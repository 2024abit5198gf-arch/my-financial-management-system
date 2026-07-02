const TransactionModel = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM('fee_payment', 'deposit', 'withdrawal'),
      allowNull: false,
      defaultValue: 'fee_payment',
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
      defaultValue: 'completed',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Transaction;
};

export default TransactionModel;
