import {LaptimeService } from "../shared/services/laptime.service";
import { SharedDataService } from "src/app/shared-data.service";
import { DataService } from "src/app/shared/data.service";
import { CarService } from "./../shared/services/car.service";
import {SensorService} from "../shared/services/sensor.service"
import { Championship, ChampionshipService } from "../shared/services/championship.service";
import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { NbToastrService } from "@nebular/theme";

import { Laptime } from "../shared/models/laptime-model";
import { Sensor } from "../shared/models/sensor-model";
import { Car } from "../shared/models/car-model";

@Component({
  selector: "app-laptime-form",
  templateUrl: "./laptime-form.component.html",
  styleUrls: ["./laptime-form.component.scss"],
})
export class LaptimeFormComponent   implements OnInit, OnDestroy, AfterContentChecked{

  private unsubscribe$ = new Subject<void>();
  timeForm!: UntypedFormGroup;
  pageTitle: string = "Cadastro de Tempos";
  sensors: Sensor[] = [];
  championships: Championship[] = [];
  cars: Car[] = [];
  sensor_1_1: number = 0;  
  sensor_2_1: number = 0;  
  sensor_3_1: number = 0;  
  sensor_1_4: number = 0;

  sensor_1_2: number = 0;  
  sensor_2_2: number = 0;  
  sensor_3_2: number = 0;  
  sensor_2_4: number = 0;

  sensor_1_3: number = 0;  
  sensor_2_3: number = 0;  
  sensor_3_3: number = 0;   
  sensor_3_4: number = 0;
  
  lap1_runner1: number = 0;  
  lap2_runner1: number = 0;  
  lap3_runner1: number = 0;

  lap1_runner2: number = 0;  
  lap2_runner2: number = 0;  
  lap3_runner2: number = 0;

  lap1_runner3: number = 0;  
  lap2_runner3: number = 0;  
  lap3_runner3: number = 0;  
  runner1: number = 0;  
  runner2: number = 0;  
  runner3: number = 0;   

  constructor(
    private dataService: DataService,
    private formBuilder: UntypedFormBuilder,
    private sensorService : SensorService,
    private championshipService: ChampionshipService,
    private carService : CarService,
    private laptimeService: LaptimeService,
    private toastrService: NbToastrService,
    private sharedDataService: SharedDataService // Inject SharedDataService
  ) {}

  ngOnInit(): void {
    this.runall();
    this.buildLaptimeForm();
    this.sharedDataService.sharedData$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (data) {
        this.applySharedData(data);
      }
    });

  }

  private applySharedData(data: any) {
    if (data) {
      this.timeForm.patchValue(data);
    }
  }

  private updateSharedData() {
    const sharedData = this.timeForm.value;
    this.sharedDataService.updateSharedData(sharedData);
  }

  ngAfterContentChecked() {
    // this.setPageTitle();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  submitForm() {
    this.createLaptime();
  }

  private setCurrentAction() {
    // if (this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    // else this.currentAction = "edit";
  }

  private buildLaptimeForm() {
    this.timeForm = this.formBuilder.group({
      battery: [null],
      championship: [null],
      sensor_1_1:[null], 
      sensor_2_1:[null], 
      sensor_3_1:[null],
      sensor_4_1: [null],
      sensor_1_4: [null],

      sensor_1_2: [null],  
      sensor_2_2: [null],
      sensor_3_2: [null],
      sensor_4_2: [null],
      sensor_2_4: [null],

      sensor_1_3: [null],
      sensor_2_3: [null], 
      sensor_3_3: [null],  
      sensor_3_4: [null], 
      sensor_4_3: [null],

      sum_1_1:[null],
      sum_2_1:[null],
      sum_3_1:[null],
      sum_1_2:[null],
      sum_2_2:[null],
      sum_3_2:[null],
      sum_1_3:[null],
      sum_2_3:[null],
      sum_3_3:[null],
      runner1:[null],
      runner2:[null],
      runner3:[null],
    });
  }
  runall(){  
  this.getOntrack();
  this.getSensors();
  this.getChampionships();
  //setTimeout(this.runall, 1);
  }

  updateview(){

  
    this.lap1_runner1 = (Number(this.timeForm.get("sensor_2_1")?.value) - Number(this.timeForm.get("sensor_1_1")?.value));//1000;
    this.lap2_runner1 = (Number(this.timeForm.get("sensor_3_1")?.value) - Number(this.timeForm.get("sensor_2_1")?.value));//1000;
    this.lap3_runner1 = (Number(this.timeForm.get("sensor_4_1")?.value) - Number(this.timeForm.get("sensor_3_1")?.value));//1000;

    this.lap1_runner2 = (Number(this.timeForm.get("sensor_2_2")?.value) - Number(this.timeForm.get("sensor_1_2")?.value));//1000;
    this.lap2_runner2 = (Number(this.timeForm.get("sensor_3_2")?.value) - Number(this.timeForm.get("sensor_2_2")?.value));//1000;
    this.lap3_runner2 = (Number(this.timeForm.get("sensor_4_2")?.value) - Number(this.timeForm.get("sensor_3_2")?.value));//1000;

    this.lap1_runner3 = (Number(this.timeForm.get("sensor_2_3")?.value) - Number(this.timeForm.get("sensor_1_3")?.value));//1000;
    this.lap2_runner3 = (Number(this.timeForm.get("sensor_3_3")?.value) - Number(this.timeForm.get("sensor_2_3")?.value));//1000;
    this.lap3_runner3 = (Number(this.timeForm.get("sensor_4_3")?.value) - Number(this.timeForm.get("sensor_3_3")?.value));//1000;

    this.runner1=this.timeForm.get("runner1")?.value;
    this.runner2=this.timeForm.get("runner2")?.value;
    this.runner3=this.timeForm.get("runner3")?.value;
    
    const newView = {
      battery: this.timeForm.get("battery")?.value,
      championship: this.timeForm.get("championship")?.value,
      runner1:this.runner1,
      runner2:this.runner2,
      runner3:this.runner3,
      sum_1_1:Number(this.lap1_runner1),
      sum_2_1:Number(this.lap2_runner1),
      sum_3_1:Number(this.lap3_runner1),
      sum_1_2:Number(this.lap1_runner2),
      sum_2_2:Number(this.lap2_runner2),
      sum_3_2:Number(this.lap3_runner2),
      sum_1_3:Number(this.lap1_runner3),
      sum_2_3:Number(this.lap2_runner3),
      sum_3_3:Number(this.lap3_runner3),
    };
    this.sharedDataService.updateSharedData(newView);
    //console.log(newView)
    this.getSensors();
  }
  
  getSensors() {
    this.sensorService
      .getAll().pipe(takeUntil(this.unsubscribe$)).subscribe(
        (ans: any) => {
          this.sensors = ans;
          console.log(this.sensors);
        },
        (error) => {
          console.log("Não foi possível obter os sensores.");
        }
      );
  }
  deleteAllSensors() {
    this.sensorService
      .deleteAll().pipe(takeUntil(this.unsubscribe$)).subscribe((error) => {
        alert("Não foi possível deletar os sensores.");});
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
          alert("Não foi possível obter os campeonatos.");
        }
      );
  }
  getOntrack(){
    this.carService
      .getCurrentCarTrack().pipe(takeUntil(this.unsubscribe$)).subscribe(
        (ans: any)=>{
          this.cars= ans;
          console.log(this.cars);
        },
        (error) => {
          alert("Não foi possível obter os carros na pista.");
        }
      )
  }
  refresh() {
    const newView = {
      battery: null,
      championship: null,
      runner1:0,
      runner2:0,
      runner3:0,
      sum_1_1:null,
      sum_2_1:null,
      sum_3_1:null,
      sum_1_2:null,
      sum_2_2:null,
      sum_3_2:null,
      sum_1_3:null,
      sum_2_3:null,
      sum_3_3:null,
    };

    window.location.reload();
    this.sharedDataService.updateSharedData(newView);
  }

  private createLaptime() {
    if (this.runner1 != null){
      const newTime1 = {
        battery: this.timeForm.get("battery")?.value,
        championshipId: this.timeForm.get("championship")?.value,
        carId:this.timeForm.get("runner1")?.value,
        lap_1:Number(this.lap1_runner1),
        lap_2:Number(this.lap2_runner1),
        lap_3:Number(this.lap3_runner1),
      };
      this.laptimeService.create(newTime1).pipe(takeUntil(this.unsubscribe$)).subscribe(
        (laptime) => {
          // this.submittingForm = false;
          this.toastrService.success(`${laptime.id} foi cadastrado!`, "Sucesso");
        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar ${this.timeForm.get("car")?.value}!`,
            "Erro"
          );
          console.log(errorResp);
          this.toastrService.danger(
            errorResp.error.description,
            errorResp.error.error
          );
        }
      );

    }
    if (this.runner2 != null){
      const newTime2 = {
        battery: this.timeForm.get("battery")?.value,
        championshipId: this.timeForm.get("championship")?.value,
        carId:this.timeForm.get("runner2")?.value,
        lap_1:Number(this.lap1_runner2),
        lap_2:Number(this.lap2_runner2),
        lap_3:Number(this.lap3_runner2),
      };
      this.laptimeService.create(newTime2).pipe(takeUntil(this.unsubscribe$)).subscribe(
        (laptime) => {
          // this.submittingForm = false;
          this.toastrService.success(`${laptime.id} foi cadastrado!`, "Sucesso");
        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar ${this.timeForm.get("car")?.value}!`,
            "Erro"
          );
          console.log(errorResp);
          this.toastrService.danger(
            errorResp.error.description,
            errorResp.error.error
          );
        }
      );

    }
    if (this.runner3 != null){
      const newTime3 = {
        battery: this.timeForm.get("battery")?.value,
        championshipId: this.timeForm.get("championship")?.value,
        carId:this.timeForm.get("runner3")?.value,
        lap_1:Number(this.lap1_runner3),
        lap_2:Number(this.lap2_runner3),
        lap_3:Number(this.lap3_runner3),
      };
      this.laptimeService
      .create(newTime3)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (laptime) => {
          // this.submittingForm = false;
          this.toastrService.success(`${laptime.id} foi cadastrado!`, "Sucesso");
          this.refresh(); 
          this.deleteAllSensors();
        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar ${this.timeForm.get("car")?.value}!`,
            "Erro"
          );
          console.log(errorResp);
          this.toastrService.danger(
            errorResp.error.description,
            errorResp.error.error
          );
        }
      );

    }
    this.deleteAllSensors();
    
    //this.refresh();
  }
  private markFormGroupTouched(formGroup: UntypedFormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
