const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "games",
    {
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "game_cards",
          key: "game_id",
        },
        unique: "unq_games_game_id",
      },
      pot: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "games",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "unq_games_game_id",
          unique: true,
          fields: [{ name: "game_id" }],
        },
      ],
    }
  );
};
