'use strict';
const { Model } = require('sequelize');
const Member = require('./Member');
module.exports = (sequelize, DataTypes) => {
 class Penalties extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   Penalties.belongsTo(models.Member, { foreignKey: 'member_id' });
  }
 }
 Penalties.init(
  {
   member_id: DataTypes.NUMBER,
   start_date: DataTypes.DATE,
   end_date: DataTypes.DATE,
   created_at: {
    type: 'TIMESTAMP',
   },
   updated_at: {
    type: 'TIMESTAMP',
   },
  },
  {
   sequelize,
   modelName: 'Penalties',
   tableName: 'penalties',
   timestamps: false,
  }
 );

 return Penalties;
};
