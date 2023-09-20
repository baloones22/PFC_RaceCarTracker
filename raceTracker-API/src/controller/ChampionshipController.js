import Championship from '../models/Championship'
import Category from '../models/Category'
const Yup = require('yup');
class ChampionshipController {

    async store(req, res){
        const schema = Yup.object().shape({        
            name: Yup.string().required(),
            categoryId: Yup.number().required().positive().integer(),});
            if(!( await schema.isValid(req.body))) {
                return res.status(400).json({ error: "validation fails from yup" })
              }
        try {
        const champExist = await Championship.findOne({ where: { name: req.body.name}});
        if(champExist) {
            return res.status(400).json({ error: "Champ already exists."});}
        const new_championship = await Championship.create(req.body);

        return res.json(new_championship);}
        catch (err) {
            console.log(err)            
            }
    }

    async index(req, res){
        try {        
            const champs = await Championship.findAll({
                include: [{
                        model: Category,
                        as: 'category'
                    }]});
                    if (!champs){
                        return res.status(404).json({ error: "Champs not found."});}        
                    return res.json(champs);}            
                catch (err) {
                    console.log(err)            
                    }
                }

    async show(req, res){
        try{const { champId } = req.params;
            const champ = await Championship.findByPk(champId);
            if(!champ) {
                return res.status(400).json({ error: "Champ not exists."});}   
        return res.json(champ);}
        catch (err) {
            console.log(err)            
            }
    }
    async delete(req, res){
        const {champId} =req.params;
        const champ=await Championship.findByPk(champId);        
        if (!champ){
        return res.status(404).json({ error: "Championship not found."});}        
        const rowCount = await Championship.destroy({ where: { id: champId} });
        return res.status(204).json({ error: "Championship deleted."});}
}

export default new ChampionshipController();
