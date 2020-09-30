'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cc_transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cc_transactions.init({
    code: DataTypes.STRING,
    order_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cc_transactions',
  });
  return cc_transactions;
};