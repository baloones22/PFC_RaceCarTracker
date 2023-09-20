const Sequelize= require('sequelize');
const { Model }=require('sequelize')

class Category extends Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                description: Sequelize.STRING,
            },
            {
                sequelize
            }
        );

        return this;
    }
    
}

export default Category;
