'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class LoanDetail extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
  }
 }
 LoanDetail.init(
  {
   loan_id: DataTypes.NUMBER,
   book_id: DataTypes.NUMBER,
   created_at: {
    type: 'TIMESTAMP',
   },
   updated_at: {
    type: 'TIMESTAMP',
   },
  },
  {
   sequelize,
   modelName: 'LoanDetail',
   tableName: 'loan_details',
   timestamps: false,
  }
 );

 return LoanDetail;
};
