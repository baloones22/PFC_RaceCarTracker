import Laptime from '../models/Laptime'
import Timeboard from '../models/Timeboard';
import Car from '../models/Car';
import Sensor from '../models/Sensor';
const Yup = require('yup');
var timerace = 0
var alap =[0,0,0,0,0,0]
var blap =[0,0,0,0,0,0]
var clap =[0,0,0,0,0,0]
var runner1 =[0,0,0,0,0]
var runner2 =[0,0,0,0,0]
var runner3 =[0,0,0,0,0]
class LaptimeController {

    async store(req, res){
        const schema = Yup.object().shape({        
            start_1: Yup.number().required(),      
            start_2: Yup.number().nullable(),      
            start_3: Yup.number().nullable(),      
            start_4: Yup.number().nullable(),      
            start_5: Yup.number().nullable(),
            first_1: Yup.number().required(),
            first_2: Yup.number().required(),
            first_3: Yup.number().required(),
            first_4: Yup.number().required(),
            first_5: Yup.number().required(),
            second_1: Yup.number().nullable(),
            second_2: Yup.number().nullable(),
            second_3: Yup.number().nullable(),
            second_4: Yup.number().nullable(),
            second_5: Yup.number().nullable(),
            third_1: Yup.number().nullable(),
            third_2: Yup.number().nullable(),
            third_3: Yup.number().nullable(),
            third_4: Yup.number().nullable(),
            third_5: Yup.number().nullable(),
            battery: Yup.number().required(),
            championship: Yup.number().required()});
            if(!( await schema.isValid(req.body))) {
                return res.status(400).json({ error: "validation fails from yup" })
              }
        const sensors= await Sensor.findAll({
            order: [['id', 'DESC']],
            limit:18
        });
        sensors.reverse();
        if (req.body.start_2==null){
            runner1[0]=req.body.start_1;//id do corredor1
            runner1[1]=12;
            runner1[2]=13;
            runner1[3]=14;
            runner1[4]=15;
            runner1[5]=16;
            runner1[6]=17;
        }
        else{ 
            if(req.body.start_3==null){
                runner1[0]=req.body.start_1;//id do corredor
                runner1[1]=6;//primeiro sensor
                runner2[0]=req.body.start_2;// id do corredor
                runner2[1]=7;//segundo sensor
            if(req.body.start_1==req.body.first_1){
                runner1[0]=req.body.start_1;               
                runner1[1]=8;  
                runner2[1]=9;}
            else{
                runner1[1]=9;  
                runner2[1]=8;}
            if(runner1[0]==req.body.first_2){
                runner1[2]=10;  
                runner2[2]=11;}
            else{
                runner1[2]=11;  
                runner2[2]=10;} 
            
            if(runner1[0]==req.body.first_3){
                runner1[3]=12;  
                runner2[3]=13;}
            else{
                runner1[3]=13;  
                runner2[3]=12;}
            
            if(runner1[0]==req.body.first_4){
                runner1[4]=14;  
                runner2[4]=15;}
            else{
                runner1[4]=15;  
                runner2[4]=14;} 
            
            if(runner1[0]==req.body.first_5){
                runner1[5]=17  
                runner2[5]=16;}
            else{
                runner1[5]=16;  
                runner2[5]=17;}          
        }
        else{
            runner1[0]=req.body.start_1;//id do corredor1
            runner1[1]=0;//primeiro sensor
            runner2[0]=req.body.start_2;// id do corredor2
            runner2[1]=1;//segundo sensor
            runner3[0]=req.body.start_3;// id do corredor3
            runner3[1]=2;//terceiro sensor
            
            if (runner1[0]==req.body.first_1){
                runner1[2]=3;}
            else{
                if(runner1[0]==req.body.second_1){
                    runner1[2]=4;}
                else{
                    runner1[2]=5;}}

            if (runner1[0]==req.body.first_2){
                runner1[3]=6;}
            else{
                if(runner1[0]==req.body.second_2){
                    runner1[3]=7;}
                else{
                    runner1[3]=8;}}

            if (runner1[0]==req.body.first_3){
                runner1[4]=9;}
            else{
                if(runner1[0]==req.body.second_3){
                    runner1[4]=10;}
                else{
                    runner1[4]=11;}}

            if (runner1[0]==req.body.first_4){
                runner1[5]=12;}
            else{
                if(runner1[0]==req.body.second_4){
                    runner1[5]=13;}
                else{
                    runner1[5]=14;}}

            if (runner1[0]==req.body.first_5){
                runner1[6]=15;}
            else{
                if(runner1[0]==req.body.second_5){
                    runner1[6]=16;}
                else{
                    runner1[6]=17;}}
             if (runner2[0]==req.body.first_1){
                runner2[2]=3;}
            else{
                if(runner2[0]==req.body.second_1){
                    runner2[2]=4;}
                else{
                    runner2[2]=5;}}

            if (runner2[0]==req.body.first_2){
                runner2[3]=6;}
            else{
                if(runner2[0]==req.body.second_2){
                    runner2[3]=7;}
                else{
                    runner2[3]=8;}}

            if (runner2[0]==req.body.first_3){
                runner2[4]=9;}
            else{
                if(runner2[0]==req.body.second_3){
                    runner2[4]=10;}
                else{
                    runner2[4]=11;}}

            if (runner2[0]==req.body.first_4){
                runner2[5]=12;}
            else{
                if(runner2[0]==req.body.second_4){
                    runner2[5]=13;}
                else{
                    runner2[5]=14;}}

            if (runner2[0]==req.body.first_5){
                runner2[6]=15;}
            else{
                if(runner2[0]==req.body.second_5){
                    runner2[6]=16;}
                else{
                    runner2[6]=17;}}
         if (runner3[0]==req.body.first_1){
                runner3[2]=3;}
            else{
                if(runner3[0]==req.body.second_1){
                    runner3[2]=4;}
                else{
                    runner3[2]=5;}}

            if (runner3[0]==req.body.first_2){
                runner3[3]=6;}
            else{
                if(runner3[0]==req.body.second_2){
                    runner3[3]=7;}
                else{
                    runner3[3]=8;}}

            if (runner3[0]==req.body.first_3){
                runner3[4]=9;}
            else{
                if(runner3[0]==req.body.second_3){
                    runner3[4]=10;}
                else{
                    runner3[4]=11;}}

            if (runner3[0]==req.body.first_4){
                runner3[5]=12;}
            else{
                if(runner3[0]==req.body.second_4){
                    runner3[5]=13;}
                else{
                    runner3[5]=14;}}

            if (runner3[0]==req.body.first_5){
                runner3[6]=15;}
            else{
                if(runner3[0]==req.body.second_5){
                    runner3[6]=16;}
                else{
                    runner3[6]=17;}}
        
        }}
        alap[0]=sensors[runner1[2]].dataValues.time-parseInt(sensors[runner1[1]].dataValues.time);
        alap[1]=sensors[runner1[3]].dataValues.time-parseInt(sensors[runner1[2]].dataValues.time);
        alap[2]=sensors[runner1[4]].dataValues.time-parseInt(sensors[runner1[3]].dataValues.time);
        alap[3]=sensors[runner1[5]].dataValues.time-parseInt(sensors[runner1[4]].dataValues.time);
        alap[4]=sensors[runner1[6]].dataValues.time-parseInt(sensors[runner1[5]].dataValues.time);
        alap[5]=runner1[0];
        console.log(alap)
        if(req.body.start_2!=null){ 
        blap[0]=sensors[runner2[2]].dataValues.time-parseInt(sensors[runner2[1]].dataValues.time);
        blap[1]=sensors[runner2[3]].dataValues.time-parseInt(sensors[runner2[2]].dataValues.time);
        blap[2]=sensors[runner2[4]].dataValues.time-parseInt(sensors[runner2[3]].dataValues.time);
        blap[3]=sensors[runner2[5]].dataValues.time-parseInt(sensors[runner2[4]].dataValues.time);
        blap[4]=sensors[runner2[6]].dataValues.time-parseInt(sensors[runner2[5]].dataValues.time);
        blap[5]=runner2[0]
        console.log(blap)
        }
        if(req.body.start_3!=null){
        clap[0]=sensors[runner3[2]].dataValues.time-parseInt(sensors[runner3[1]].dataValues.time);
        clap[1]=sensors[runner3[3]].dataValues.time-parseInt(sensors[runner3[2]].dataValues.time);
        clap[2]=sensors[runner3[4]].dataValues.time-parseInt(sensors[runner3[3]].dataValues.time);
        clap[3]=sensors[runner3[5]].dataValues.time-parseInt(sensors[runner3[4]].dataValues.time);
        clap[4]=sensors[runner3[6]].dataValues.time-parseInt(sensors[runner3[5]].dataValues.time);
        clap[5]=runner3[0];
        console.log(clap)

        }
        return res.json(sensors)
        //const new_laptime = await Laptime.create(req.body); 
        
        //return res.json(new_laptime);
    }

    async index(req, res){
        const laptimes = await Laptime.findAll();

        return res.json(laptimes);
    }

    async show(req, res){
        const { id } = req.params;

        const laptime = await Laptime.findOne({
            where: { id }
        });

        return res.json(laptime);
    }

    async update(req, res){
        const { car_id, round_number, championship_id} = req.body;

        const timeboard = await Timeboard.findOne({
            where:{
                car_id,
                round_number,
                championship_id
            }
        });

        if(!timeboard){
            return res.status(400).json({ error: "This car is not on track or not in this championship" })
        }

        const laptime = await Laptime.findByPk(timeboard.laptime_id);

        if(!laptime.lap_1){
            laptime.lap_1 = req.body.laptime
        }else if(!laptime.lap_2){
            laptime.lap_2 = req.body.laptime
        }else if(!laptime.lap_3){
            laptime.lap_3 = req.body.laptime
        }else if(!laptime.lap_4){
            laptime.lap_4 = req.body.laptime
        }else if(!laptime.lap_5){
            laptime.lap_5 = req.body.laptime
            
            const car = await Car.findByPk(timeboard.car_id)
            car.on_track = false
            await car.save()

            const laps = [Number(laptime.lap_1), Number(laptime.lap_2), Number(laptime.lap_3), Number(laptime.lap_4), Number(laptime.lap_5)]
            timeboard.best_time = Math.min(...laps);
            timeboard.finished_round = true

            await timeboard.save();
        }else {
            return res.status(400).json({ error: "This round is already finished" })
        }

        await laptime.save()

        return res.json({message: "Lap time registered"})
    }

}

export default new LaptimeController();
