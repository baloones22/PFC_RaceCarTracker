
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('championships', {
      id: {
        type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
				allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id' }
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
    return queryInterface.dropTable('championships');
  }
};
