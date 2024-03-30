import Sequelize, { Model } from 'sequelize';

class Round extends Model {
    static init(sequelize){
        super.init(
            {name: Sequelize.STRING,},
            {sequelize}
        );
        return this;}
    static associate(models){
        this.belongsTo(models.Championship, {as: 'championship', foreignKey: 'championshipId'});
        this.belongsTo(models.Car, {as: 'car', foreignKey: 'carId'});
    }
}
export default Round;
