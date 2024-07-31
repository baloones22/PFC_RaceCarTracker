module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('rounds', {
      id: {
        type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
      },
      championship_id: {
        type: Sequelize.INTEGER,
				allowNull: false,
        references: {
          model: 'championships',
          key: 'id' }
        },
        car_id:{
        type: Sequelize.INTEGER,
				allowNull: false,
        references: {
          model: 'cars',
          key: 'id' }
        },
      name: {
        type: Sequelize.INTEGER,
				allowNull: false
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
    return queryInterface.dropTable('rounds');
  }
};
