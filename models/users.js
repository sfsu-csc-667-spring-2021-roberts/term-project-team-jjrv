const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'messages',
        key: 'user_id'
      }
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "CURRENT_TIME"
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_users_user_id",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
