'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 class Member extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   Member.hasMany(models.Loan, { foreignKey: 'member_id' });
   Member.hasMany(models.Penalties, { foreignKey: 'member_id' });
  }
 }

 Member.init(
  {
   code: DataTypes.STRING,
   name: DataTypes.STRING,
   created_at: {
    type: 'TIMESTAMP',
   },
   updated_at: {
    type: 'TIMESTAMP',
   },
  },
  {
   sequelize,
   modelName: 'Member',
   tableName: 'members',
   timestamps: false,
  }
 );

 return Member;
};
