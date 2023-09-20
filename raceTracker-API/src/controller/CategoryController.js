import Category from '../models/Category'
const Yup = require('yup');
class CategoryController {
   
   
    async store(req, res){
        const schema = Yup.object().shape({
        
            name: Yup.string().required(),
            description: Yup.string().required(),});            
        //const new_category = await Category.create(req.body);
        //return res.json(new_category);
        if(!( await schema.isValid(req.body))) {
            return res.status(400).json({ error: "validation fails from yup" })
          }
        const categoryExist = await Category.findOne({ where: { name: req.body.name}});
        if(categoryExist) {
            return res.status(400).json({ error: "Category already exists."});}
        const categories= await Category.create(req.body);
        return res.json(categories);
    }
    async delete(req, res){
        const {categoryId} =req.params;
        const category=await Category.findByPk(categoryId);

        if (!category){
        return res.status(404).json({ error: "Category not found."});}

        const rowCount = await Category.destroy({ where: { id: categoryId} });
        return res.status(204).json({ error: "Category deleted."});}        
      

    async index(req, res){
        try {  const categories = await Category.findAll();
        return res.json(categories);} 
        catch (err) {
            console.log(err)            
            } }
    async show(req, res){
        try{const { categoryId } = req.params;
        const category = await Category.findByPk(categoryId);
        if (!category){
            res.status(401).json({error:'category does not exist'})
        }
        return res.json(category);}
        catch (err) {
            console.log(err)            
            }
    }
}
export default new CategoryController();
