import { Round } from './../shared/models/round-model';
import { RoundService } from './../shared/services/round.service';
import { Component, OnInit } from '@angular/core';
import { Laptime } from '../shared/models/laptime-model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarService } from '../shared/services/car.service';
import { Championship, ChampionshipService } from '../shared/services/championship.service';
import { Car } from '../shared/models/car-model';
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: 'app-panel-show',
  templateUrl: './panel-show.component.html',
  styleUrls: ['./panel-show.component.scss']
})
export class PanelShowComponent implements OnInit {
  
  private unsubscribe$ = new Subject<void>();
  public currentCar: any;
  championships: Championship[] = [];
  public rounds: Round[] = [];
  public cars: Car[] = [];
  selected: any;
  ontracks: Car[] = [];
  laps_championship: Laptime[] = [];
  laps_car: Laptime[] = [];
  laps_round: Laptime[] = [];
  car_name: any  ="";
  car_owner: any ="";
  car_plate: any ="";
  car_model: any ="";
  name_car: any =[];

  constructor(
    private carService: CarService,
    private championshipService: ChampionshipService,
    private roundService: RoundService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.getChampionships();
    this.getCars();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getInfo(event: any){
    this.currentCar = event;
    this.getCurrentCar();
  }
  getCurrentCar(): void {
    console.log(this.currentCar);
    this.carService.getById(this.currentCar).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (ans: Car)=>{
        this.car_name=ans.name;
        this.car_owner=ans.owner;
        this.car_plate=ans.plate;
        this.car_model=ans.model;
      },
      (error) => {
        alert("Não foi possível obter os carros na pista.");
      })
  }

  getCars(): void {
    this.carService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (ans: any) => {
          this.cars = ans;
          console.log(this.cars);
        },
        (error) => {
          alert('não foi possivel obter os carros!');
        }
      );
  }

  getChampionships() {
    this.championshipService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (ans: any) => {
          this.championships = ans;
          console.log(this.championships);
        },
        (error) => {
          alert('Não foi possível obter os campeonatos.');
        }
      );
  }

  getLapsByChampionship(event: any) {
    this.roundService
      .getRoundsByChampionship(event).pipe(takeUntil(this.unsubscribe$)).subscribe(
        (ans: any) => {
          this.laps_championship= ans;
          //console.log(this.laps_championship);
          this.getCarNameById();
        },
        (error) => {
          alert('Não foi possível obter os baterias.');
        }
      );
  }
  getCarNameById(){
    for (var i=0; i<this.laps_championship.length; i++){
      const carid =this.laps_championship[i].carId
    this.carService.getById(carid).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (ans: Car) => {
        console.log(ans.name);
        console.log(carid);
        this.name_car[carid]=ans.name;
      },
      (error) => {
        alert('não foi possivel obter os carros!');
      }
    );
  console.log(this.name_car[i])}
 }

  sendCarToTrack(event: any) {
    const  sendCar={
    car: event,}
    this.carService.sendToTrack(sendCar).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (car) => {
     // this.submittingForm = false;
     this.toastrService.success(`${sendCar.car} foi cadastrado!`, "Sucesso");
   },
   (errorResp) => {
     this.toastrService.danger(
       `Falha ao cadastrar ${event}!`,
       "Erro"
     );

     console.log(errorResp);

     this.toastrService.danger(
       errorResp.error.description,
       errorResp.error.error
     );
    });

  }
}


// {
//   action: 'toW',
//   payload:
// }
