const FinanceSummaryModel = (sequelize, DataTypes) => {
  const FinanceSummary = sequelize.define('FinanceSummary', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    revenue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    outstanding: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    students: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    monthlyData: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  });

  return FinanceSummary;
};

export default FinanceSummaryModel;
