const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_cards', {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "unq_game_cards_game_id"
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "unq_game_cards_card_id"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    card_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'game_cards',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unq_game_cards_card_id",
        unique: true,
        fields: [
          { name: "card_id" },
        ]
      },
      {
        name: "unq_game_cards_game_id",
        unique: true,
        fields: [
          { name: "game_id" },
        ]
      },
    ]
  });
};
