import Laptime from '../models/Laptime'
import Timeboard from '../models/Timeboard';
import Car from '../models/Car';
import Championship from '../models/Championship';
import path from 'path'; // Adicionar módulo path para caminhos de arquivo
import PDFDocument from 'pdfkit'; // Corrigindo a importação do PDFKit
import Sensor from '../models/Sensor';
const { Op } = require("sequelize");
const Yup = require('yup');
class LaptimeController {
    async store(req, res){
        const schema = Yup.object().shape({        
            lap_1: Yup.number().required(),      
            lap_2: Yup.number().nullable(),      
            lap_3: Yup.number().nullable(),
            battery: Yup.number().required(),
            carId:Yup.number().required("runner can't be empty"),
            championshipId: Yup.number().required()});
            if(!( await schema.isValid(req.body))) {
                return res.status(400).json({ error: "validation fails from yup" })
              }
              console.log(req.body)
        try {                 
            const champExist = await Championship.findOne({ where: { id: req.body.championshipId}});
            if(!champExist) {
                return res.status(400).json({ error: "Champ not exists."});}    
        const new_laptime = await Laptime.create(req.body); 
        return res.json(new_laptime);
        }
        catch (err) {
            console.log(err)            
            } 
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
    async showbyId(req, res){
        try{
        const { championshipId } = req.params;
        const laptimes = await Laptime.findAll({
            where: {
                championshipId
            },
        include:[
            { model: Championship,
                as: 'championship'
            }]});
        console.log(laptimes);
        return res.json(laptimes);        
    }
        catch (err) {
            console.log(err)            
            }
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
    
    formatTime(milliseconds) {
        if (!milliseconds) return null;
        
    }

    async exportPDF(req, res) {
        try {
            const { championshipId } = req.params;

            // Verificar se o campeonato existe
            const championship = await Championship.findByPk(championshipId);
            if (!championship) {
                return res.status(400).json({ error: "Championship not exists." });
            }

            // Buscar todos os tempos de volta do campeonato especificado
            const laptimes = await Laptime.findAll({
                where: { championshipId },
                include: [
                    {
                        model: Championship,
                        as: 'championship',
                        attributes: ['name']
                    }
                ]
            });

            // Criar o documento PDF
            const doc = new PDFDocument();
            let chunks = [];
            let result;

            doc.on('data', (chunk) => {
                chunks.push(chunk);
            });

            doc.on('end', () => {
                result = Buffer.concat(chunks);
                res.contentType('application/pdf');
                res.send(result);
            });
            const imagePath = path.resolve(__dirname, 'logo1.png'); // Substitua pelo caminho relativo real

            doc.image(imagePath, {
                fit: [100, 120], // Ajuste o tamanho da imagem
                x: 10, // Posiciona a imagem 10 unidades da margem direita
                y: 20 // Posiciona a imagem 20 unidades da margem superior
            });

            doc.fontSize(20).text(`Laptimes for Championship: ${championship.name}`, { align: 'center' });
            doc.image(imagePath, {
                fit: [100, 120], // Ajuste o tamanho da imagem
                x: doc.page.width - 110, // Posiciona a imagem 10 unidades da margem direita
                y: 20 // Posiciona a imagem 20 unidades da margem superior
            });

            for (const laptime of laptimes) {
                const car =await Car.findByPk(laptime.carId);
                if (!car) {
                    return res.status(400).json({ error: "Car not exists." });
                }
                const minutes1 = Math.floor(laptime.lap_1 / 60000);
                const seconds1 = ((laptime.lap_1 % 60000) / 1000).toFixed(3);
                const minutes2 = Math.floor(laptime.lap_1 / 60000);
                const seconds2 = ((laptime.lap_2 % 60000) / 1000).toFixed(3);
                const minutes3 = Math.floor(laptime.lap_1 / 60000);
                const seconds3 = ((laptime.lap_3 % 60000) / 1000).toFixed(3);
                doc.moveDown()
                doc.moveDown()
                   .fontSize(14)
                   .text(` Runner: ${car.owner || 'N/A'} - Car: ${car.name || 'N/A'}`)
                   .text(` Lap 1:  ${minutes1|| '0'}:${seconds1.padStart(6, '0')|| 'N/A'} - Lap 2: ${minutes2|| '0'}:${seconds2.padStart(6, '0')|| 'N/A'} - Lap 3: ${minutes3|| '0'}:${seconds3.padStart(6, '0')|| 'N/A'}`)
                   .text(` Battery: ${laptime.battery}`);
            };

            doc.end();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    

}

export default new LaptimeController();
