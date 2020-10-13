'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsToMany(models.tags, {
        as: 'tags',
        foreignKey: 'id',
        through: 'product_tags'
      });
      products.belongsToMany(models.categories, {
        as: 'categories',
        foreignKey: 'id',
        through: 'product_categories'
      });
      products.belongsTo(models.product_statuses, {
        as:'product_statuses',
        foreignKey: 'id'
      });
    }
  };
  products.init({
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    product_status_id: DataTypes.INTEGER,
    regular_price: DataTypes.INTEGER,
    discount_price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    taxable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'products',
    tableName: 'products',
    underscored: true
  });
  return products;
};