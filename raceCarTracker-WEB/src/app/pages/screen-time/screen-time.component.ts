
import { NbToastrService } from "@nebular/theme";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { SharedDataService } from "src/app/shared-data.service";
import { DataService } from "src/app/shared/data.service";
import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarService } from '../shared/services/car.service';
import { LaptimeService } from '../shared/services/laptime.service';
import { Championship, ChampionshipService } from '../shared/services/championship.service';
import { Car } from '../shared/models/car-model';
import { LaptimeFormComponent } from "../laptime-form/laptime-form.component";


export interface Lap {
  time?: string,
  round?: string,
  car?: string,
}

@Component({
  selector: 'app-screen-time',
  templateUrl: './screen-time.component.html',
  styleUrls: ['./screen-time.component.scss']
})
export class ScreenTimeComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  public currentCar: any;
  championships: Championship[] = [];
  public cars: Car [] =[];
  selected: any;
  ontracks: Car[] = [];
  run1_1: number=0;
  laps: Lap[] = [];
  name1: any  ="";
  owner1: any ="";

  name2: any  ="";
  owner2: any ="";

  name3: any  ="";
  owner3: any ="";

  sum1_3: number = 0;
  sum1_3m: number = 0;
  sum1_3s: number = 0;
  sum1_3ms: number = 0;    

  sum2_3: number = 0;
  sum2_3m: number = 0;
  sum2_3s: number = 0;
  sum2_3ms: number = 0; 
    
  sum3_3: number = 0;
  sum3_3m: number = 0;
  sum3_3s: number = 0;
  sum3_3ms: number = 0; 

  sum1_2: number = 0;
  sum1_2m: number = 0;
  sum1_2s: number = 0;
  sum1_2ms: number = 0;  

  sum2_2: number = 0;
  sum2_2m: number = 0;
  sum2_2s: number = 0;
  sum2_2ms: number = 0;

  sum3_2: number = 0;
  sum3_2m: number = 0;
  sum3_2s: number = 0;
  sum3_2ms: number = 0;

  sum1_1: number = 0;
  sum1_1m: number = 0;
  sum1_1s: number = 0;
  sum1_1ms: number = 0;

  sum2_1: number = 0;
  sum2_1m: number = 0;
  sum2_1s: number = 0;
  sum2_1ms: number = 0; 

  sum3_1: number = 0;
  sum3_1m: number = 0;
  sum3_1s: number = 0;
  sum3_1ms: number = 0; 

  runner1: any ="";
  runner2: any ="";
  runner3: any ="";
  
  sum1_1$ = this.dataService.sum1_1;  
  sum2_1$ = this.dataService.sum2_1;  
  sum3_1$ = this.dataService.sum3_1;

  sum1_2$ = this.dataService.sum1_2;  
  sum2_2$ = this.dataService.sum2_2;  
  sum3_2$ = this.dataService.sum3_2;

  sum1_3$ = this.dataService.sum1_3;  
  sum2_3$ = this.dataService.sum2_3;  
  sum3_3$ = this.dataService.sum3_3;

  constructor(
    private carService: CarService,
    private dataService: DataService,
    private lapTimeService: LaptimeService,
    private sharedDataService: SharedDataService // Inject SharedDataService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.sharedData$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
    if (data) {
      this.applySharedData(data);
    }
  });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private applySharedData(data: any) {
    // Apply shared data to the local variables
    if (data) {
      // Apply the necessary fields from shared data
      this.sum1_1 = this.verifyValid(data.sum_1_1);
      this.sum2_1 = this.verifyValid(data.sum_2_1);
      this.sum3_1 = this.verifyValid(data.sum_3_1);

      this.sum1_2 = this.verifyValid(data.sum_1_2);
      this.sum2_2 = this.verifyValid(data.sum_2_2);
      this.sum3_2 = this.verifyValid(data.sum_3_2); 

      this.sum1_3 = this.verifyValid(data.sum_1_3);
      this.sum2_3 = this.verifyValid(data.sum_2_3);
      this.sum3_3 = this.verifyValid(data.sum_3_3);
      this.runner1= this.verifyValid(data.runner1);
      this.runner2= this.verifyValid(data.runner2);
      this.runner3= this.verifyValid(data.runner3);
      this.championships= data.championship;
      this.convertTime()
      this.getRunners();
    }
  }
  verifyValid(value : number){
    if(value<0){
      value=0;
    }
    return value;
  }
  convertTime(){
    this.sum1_1m=Math.trunc(Math.trunc(this.sum1_1/1000)/60);
    this.sum1_1s=Math.trunc(this.sum1_1/1000)-this.sum1_1m*60;
    this.sum1_1ms=this.sum1_1%1000;
    //this.sum1_1s.padStart(2,'0');

    this.sum1_2m=Math.trunc(Math.trunc(this.sum1_2/1000)/60);
    this.sum1_2s=Math.trunc(this.sum1_2/1000)-this.sum1_2m*60;
    this.sum1_2ms=this.sum1_2%1000;

    this.sum1_3m=Math.trunc(Math.trunc(this.sum1_3/1000)/60);
    this.sum1_3s=Math.trunc(this.sum1_3/1000)-this.sum1_3m*60;
    this.sum1_3ms=this.sum1_3%1000;


    this.sum2_1m=Math.trunc(Math.trunc(this.sum2_1/1000)/60);
    this.sum2_1s=Math.trunc(this.sum2_1/1000)-this.sum2_1m*60;
    this.sum2_1ms=this.sum2_1%1000;

    this.sum2_2m=Math.trunc(Math.trunc(this.sum2_2/1000)/60);
    this.sum2_2s=Math.trunc(this.sum2_2/1000)-this.sum2_2m*60;
    this.sum2_2ms=this.sum2_2%1000;

    this.sum2_3m=Math.trunc(Math.trunc(this.sum2_3/1000)/60);
    this.sum2_3s=Math.trunc(this.sum2_3/1000)-this.sum2_3m*60;
    this.sum2_3ms=this.sum2_3%1000;


    this.sum3_1m=Math.trunc(Math.trunc(this.sum3_1/1000)/60);
    this.sum3_1s=Math.trunc(this.sum3_1/1000)-this.sum3_1m*60;
    this.sum3_1ms=this.sum3_1%1000;

    this.sum3_2m=Math.trunc(Math.trunc(this.sum3_2/1000)/60);
    this.sum3_2s=Math.trunc(this.sum3_2/1000)-this.sum3_2m*60;
    this.sum3_2ms=this.sum3_2%1000;


    this.sum3_3m=Math.trunc(Math.trunc(this.sum3_3/1000)/60);
    this.sum3_3s=Math.trunc(this.sum3_3/1000)-this.sum3_3m*60;
    this.sum3_3ms=this.sum3_3%1000;
  }
  getRunners(){
  console.log(this.dataService.sum1_1Source.getValue());
   this.carService.getById(this.runner1).pipe(takeUntil(this.unsubscribe$)).subscribe(
    (ans: Car)=>{
      this.name1=ans.name;
      this.owner1=ans.owner;
    },
    (error) => {
      alert("Não foi possível obter os carros na pista.");
    })
    this.carService.getById(this.runner2).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (ans: Car)=>{
        this.name2=ans.name;
        this.owner2=ans.owner;
      },
      (error) => {
        alert("Não foi possível obter os carros na pista.");
      })
      this.carService.getById(this.runner3).pipe(takeUntil(this.unsubscribe$)).subscribe(
        (ans: Car)=>{
          this.name3=ans.name;
          this.owner3=ans.owner;        
        },
        (error) => {
          alert("Não foi possível obter os carros na pista.");
        })
  }
}
