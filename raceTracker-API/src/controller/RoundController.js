import Round from '../models/Round';
import Car from '../models/Car'
import Category from '../models/Category'
import Timeboard from '../models/Timeboard';
import Laptime from '../models/Laptime';
import Championship from '../models/Championship';
const Yup = require('yup');

class RoundController {

    async store(req, res){
        const schema = Yup.object().shape({
        
            name: Yup.number().required().positive().integer(),
            championshipId: Yup.number().required().positive().integer(),
            carId: Yup.number().required().positive().integer(),});
            if(!( await schema.isValid(req.body))) {
                return res.status(400).json({ error: "validation fails from yup" })
              }
        
        try { 
            const roundExist = await Round.findOne({ where: { name: req.body.name,carId: req.body.carId,championshipId:req.body.championshipId}});
            if(roundExist) {
                return res.status(400).json({ error: "Round already exists."});}
            const championship = await Category.findOne({where: {id: req.body.championshipId}});
        if(!championship){
            return res.status(400).json({ error: "Round needs a valid category" });
        }
        const new_round = await Round.create(req.body);
        return res.json(new_round);}
        catch (err) {
            console.log(err)            
            }
    }

    async index(req, res){
        try { 
        const { championshipId} = req.params;        
            const rounds = await Round.findAll({
                include: [{
                        model: Championship,
                        as: 'championship',
                        model: Car,
                        as: 'car'
                    }],
                });
                    if (!rounds){
                        return res.status(404).json({ error: "Rounds not found."});}        
                    return res.json(rounds);}
            
                catch (err) {
                    console.log(err)            
                    }}

    async show(req, res){
        try{const { roundsId } = req.params;
        const round = await Round.findByPk(roundsId);
        return res.json(round);}
        catch (err) {
            console.log(err)            
            }}

    async showbychampionship(req, res){
                try{
                const { championshipId } = req.params;
                const round = await Round.findAll({
                    where: {
                        championshipId
                    },
                include:[
                    { model: Championship,
                        as: 'championship'
                    }]});
                return res.json(round);}
                catch (err) {
                    console.log(err)            
                    }}

            async delete(req, res){
                const {roundId} =req.params;
                const round=await Round.findByPk(roundId);        
                if (!round){
                return res.status(404).json({ error: "Round not found."});}        
                const rowCount = await Round.destroy({ where: { id: roundId} });
                return res.status(204).json({ error: "Round deleted."});}
 }
export default new RoundController();
