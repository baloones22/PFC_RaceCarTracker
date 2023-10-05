import Sensor from '../models/Sensor'
const Yup = require('yup');
class SensorController {
   
   
    async store(req, res){
        try {const schema = Yup.object().shape({
            time: Yup.string().required(),
            sensor: Yup.number().required(),});
            console.log(JSON.stringify(req.body)) 
        if(!( await schema.isValid(req.body))) {
            return res.status(400).json({ error: "validation fails from yup" })}
        const sensors= await Sensor.create(req.body);
        return res.json(sensors);}
        catch (err) {
            console.log(err)            
            } }
    
    async delete(req, res){
        const {sensorId} =req.params;
        const sensor=await Sensor.findAll({where:{sensor:sensorId}});
        if (!sensor){
        return res.status(404).json({ error: "Sensor not found."});}
        const rowCount = await Sensor.destroy({ where: { sensor: sensorId} });
        return res.status(204).json({ error: "Sensor deleted."});}        
      

    async index(req, res){
        try {  const sensors = await Sensor.findAll();
        return res.json(sensors);} 
        catch (err) {
            console.log(err)            
            } }
    async show(req, res){
        try{const { sensorId } = req.params;
        const sensor = await Sensor.findAll({where:{sensor:sensorId}});
        if (!sensor){
            res.status(401).json({error:'sensor does not exist'})
        }
        return res.json(sensor);}
        catch (err) {
            console.log(err)            
            }
    }
}
export default new SensorController();
