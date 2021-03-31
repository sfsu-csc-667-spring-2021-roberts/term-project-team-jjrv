const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_users', {
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'games',
        key: 'game_id'
      }
    },
    current: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    users_in_game: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "unq_game_users_users_in_game"
    }
  }, {
    sequelize,
    tableName: 'game_users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_game_users_game_id",
        unique: true,
        fields: [
          { name: "game_id" },
        ]
      },
      {
        name: "unq_game_users_users_in_game",
        unique: true,
        fields: [
          { name: "users_in_game" },
        ]
      },
    ]
  });
};
