
"use strict";
// all database tables are created using this file
module.exports = {
  up: async (sequelize, DataTypes) => {
    
    /*===============================================
                  messages
    ================================================ */
    await sequelize.createTable("messages", {
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.literal("NOW()"),
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    });

    /*===============================================
                  users
    ================================================ */
    await sequelize.createTable("users", {
      user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,

      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()'),
      },
    });



    /*===============================================
                  game_cards
    ================================================ */

    await sequelize.createTable('game_cards', {
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
       
      },
      card_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      card_order: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    });

    /*===============================================
                  cards
    ================================================ */
    await sequelize.createTable("cards", {
      card_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
       
      },
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      suite: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    });
    /*===============================================
                  Games
    ================================================ */
    await sequelize.createTable("games", {
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
   
      },
      pot: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
    /*===============================================
                  Game_Users
    ================================================ */
    await sequelize.createTable('game_users', {
      order: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

      },
      current: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      users_in_game: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: true,
      }, 
      usersnames: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
 
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("games");
    await queryInterface.dropTable("messages");
    await queryInterface.dropTable("game_users");
    await queryInterface.dropTable("cards");
    await queryInterface.dropTable("game_cards");
  },
};
