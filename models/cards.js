const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cards', {
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'game_cards',
        key: 'card_id'
      }
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    suite: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cards',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_cards_card_id",
        unique: true,
        fields: [
          { name: "card_id" },
        ]
      },
    ]
  });
};
