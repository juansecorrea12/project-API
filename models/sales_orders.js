'use strict';
const {
  Model
} = require('sequelize');
const users = require('./users');
module.exports = (sequelize, DataTypes) => {
  class sales_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sales_orders.belongsTo(models.coupons, {
        as:'coupons',
        foreignKey: 'coupon_id'
      });
      sales_orders.belongsTo(models.sessions, {
        as:'sessions',
        foreignKey: 'session_id'
      });
      sales_orders.belongsTo(models.users, {
        as:'users',
        foreignKey: 'user_id'
      });
    }
  };
  sales_orders.init({
    order_date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    coupon_id: DataTypes.INTEGER,
    session_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sales_orders',
    tableName: 'sales_orders',
    underscored: true
  });
  return sales_orders;
};