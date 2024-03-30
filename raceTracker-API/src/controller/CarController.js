import Car from '../models/Car';
import Category from '../models/Category'
import Timeboard from '../models/Timeboard';
import Laptime from '../models/Laptime';
import Championship from '../models/Championship';
const Yup = require('yup');

class CarController {

    async store(req, res){
        const schema = Yup.object().shape({
        
            name: Yup.string().required(),
            plate: Yup.string().required(),
            model: Yup.string().required(),
            owner: Yup.string().required(),
            on_track: Yup.boolean(),
            category_id: Yup.number().required().positive().integer(),});
            if(!( await schema.isValid(req.body))) {
                return res.status(400).json({ error: "validation fails from yup" })
              }
        
        try { 
            const carExist = await Car.findOne({ where: { plate: req.body.plate}});
            if(carExist) {
                return res.status(400).json({ error: "Car already exists."});}
            const category = await Category.findOne({where: {id: req.body.category_id}});
        if(!category){
            return res.status(400).json({ error: "Car needs a valid category" });
        }
        const new_car = await Car.create(req.body);
        return res.json(new_car);}
        catch (err) {
            console.log(err)            
            }
    }

    async index(req, res){
        try { 
            const cars = await Car.findAll({
                include: [{
                        model: Category,
                        as: 'category'
                    }]});
                    if (!cars){
                        return res.status(404).json({ error: "Cars not found."});}        
                    return res.json(cars);}
            
                catch (err) {
                    console.log(err)            
                    }}

    async show(req, res){
        try{const { carId } = req.params;
        
        const car = await Car.findByPk(carId);
        return res.json(car);}
        catch (err) {
            console.log(err)            
            }}
    async showbycategory(req, res){
                try{
                const { categoryId } = req.params;
                const car = await Car.findAll({
                    where: {
                        categoryId
                    },
                include:[
                    { model: Category,
                        as: 'category'
                    }]});
                return res.json(car);}
                catch (err) {
                    console.log(err)            
                    }}

    async current_on_track(req, res){
        try{ 
            const cars = await Car.findAll({where:{on_track: true},
            include:[{
                    model: Category,
                    as: 'category'
                }]});
            if (!cars){
                return res.status(404).json({ error: "Cars not found."});}
            return res.json(cars);}
        catch (err) {
            console.log(err)}}
            
    async on_track(req, res){
        try{
            const schema = Yup.object().shape({
            car: Yup.string().required(),});
            if(!( await schema.isValid(req.body))) {
                return res.status(400).json({ error: "validation fails from yup" })}
            const carId=req.body.car
            const car = await Car.findByPk(carId);
            if(car.on_track==true){
                return res.status(400).json({ error: "Car already on a track."});  }
            else {
                car.on_track=true
                await car.save()
                return res.json(car)}}
        catch (err) {
            console.log(err)}}
        async on_track(req, res){
        try{
            const schema = Yup.object().shape({
            car: Yup.string().required(),});
            if(!( await schema.isValid(req.body))) {
                return res.status(400).json({ error: "validation fails from yup" })}
            const carId=req.body.car
            const car = await Car.findByPk(carId);
            if(car.on_track==true){
                return res.status(400).json({ error: "Car already on a track."});  }
            else {
                car.on_track=true
                await car.save()
                return res.json(car)}}
        catch (err) {
            console.log(err)}}


        async out_track(req, res){
            try{
            const {carId} =req.params;
            const car=await Car.findByPk(carId);        
            if (!car){
            return res.status(404).json({ error: "Car not found."});} 
            if(car.on_track==false){
                return res.status(400).json({ error: "Car already out of track."});  }
            else {
                car.on_track=false
                await car.save()
                return res.json(car)}}
                catch (err) {
                    onsole.log(err)}}

    async delete(req, res){
                const {carId} =req.params;
                const car=await Car.findByPk(carId);        
                if (!car){
                return res.status(404).json({ error: "Car not found."});}        
                const rowCount = await Car.destroy({ where: { id: carId} });
                return res.status(204).json({ error: "Car deleted."});}
 }



export default new CarController();
