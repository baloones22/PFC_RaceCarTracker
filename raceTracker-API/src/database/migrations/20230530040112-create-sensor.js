
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('sensors', {
      id: {
        type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
      },

      time: {  
        type: Sequelize.STRING,
				allowNull: false
      },
      sensor: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at:{
          type: Sequelize.DATE,
          allowNull:false,
        },
      updated_at:{
          type: Sequelize.DATE,
          allowNull:false,
        }
      });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('sensors');
  }
};
