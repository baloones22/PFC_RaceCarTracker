import Sequelize, { Model } from 'sequelize';

class Championship extends Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                categoryId:Sequelize.INTEGER,
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

export default Championship;
