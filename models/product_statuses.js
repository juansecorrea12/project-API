'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_statuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_statuses.hasMany(models.products, {
        as:'products',
        foreignKey: 'id'
      });
    }
  };
  product_statuses.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_statuses',
    tableName: 'product_statuses',
    underscored: true
  });
  return product_statuses;
};