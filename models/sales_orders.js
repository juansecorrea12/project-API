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
      coupon_id.hasMany(models.coupons, {
        as:'coupons',
        foreignKey: 'id'
      });
      session_id.hasMany(models.sessions, {
        as:'sessions',
        foreignKey: 'id'
      });
      user_id.hasMany(models.users, {
        as:'users',
        foreignKey: 'id'
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
  });
  return sales_orders;
};