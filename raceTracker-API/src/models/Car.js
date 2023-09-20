import Sequelize, { Model } from 'sequelize';

class Car extends Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                plate: Sequelize.STRING,
                model: Sequelize.STRING,
                owner: Sequelize.STRING,
                categoryId:Sequelize.INTEGER,
                on_track: Sequelize.BOOLEAN                
            },
            {
                sequelize
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Category, {as: 'category', foreignKey: 'categoryId'});
    }
}

export default Car;
