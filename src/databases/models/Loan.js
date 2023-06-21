'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class Loan extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   Loan.belongsTo(models.Member, { foreignKey: 'member_id' });
   Loan.belongsToMany(models.Book, {
    foreignKey: 'loan_id',
    through: models.LoanDetail,
   });
  }
 }
 Loan.init(
  {
   member_id: DataTypes.NUMBER,
   loan_date: DataTypes.DATE,
   due_date: DataTypes.DATE,
   return_date: DataTypes.DATE,
   total_book: DataTypes.NUMBER,
   created_at: {
    type: 'TIMESTAMP',
   },
   updated_at: {
    type: 'TIMESTAMP',
   },
  },
  {
   sequelize,
   modelName: 'Loan',
   tableName: 'loans',
   timestamps: false,
  }
 );

 return Loan;
};
