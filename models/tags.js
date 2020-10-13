'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tags.belongsToMany(models.products, {
        as: 'products',
        foreignKey: 'tag_id',
        through:'product_tags'
    });
    }
  };
  tags.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tags',
    tableName: 'tags',
    underscored: true
  });
  return tags;
};