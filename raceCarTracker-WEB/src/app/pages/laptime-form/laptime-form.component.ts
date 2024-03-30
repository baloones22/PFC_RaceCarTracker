import {LaptimeService } from "../shared/services/laptime.service";
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
export class LaptimeFormComponent
  implements OnInit, OnDestroy, AfterContentChecked{
  private unsubscribe$ = new Subject<void>();
  timeForm!: UntypedFormGroup;
  pageTitle: string = "Cadastro de Tempos";
  sensors: Sensor[] = [];
  championships: Championship[] = [];
  cars: Car[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private sensorService : SensorService,
    private championshipService: ChampionshipService,
    private carService : CarService,
    private laptimeService: LaptimeService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getOntrack();
    //this.getSensors();
    this.getChampionships();
    this.buildLaptimeForm();
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
      laptime1: [null],
      laptime2: [null],
      laptime3: [null],
      championship: [null],
      start_1:[null],
      start_2:[null],
      start_3:[null],
      first_1:[null],
      first_2:[null],
      first_3:[null],
      first_4:[null],
      first_5:[null],
      second_1:[null],
      second_2:[null],
      second_3:[null],
      second_4:[null],
      second_5:[null],
      third_1:[null],
      third_2:[null],
      third_3:[null],
      third_4:[null],
      third_5:[null],
    });
  }

  getSensors() {
    this.sensorService
      .getAll().pipe(takeUntil(this.unsubscribe$)).subscribe(
        (ans: any) => {
          this.sensors = ans;
          console.log(this.sensors);
        },
        (error) => {
          alert("Não foi possível obter os sensores.");
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
  private createLaptime() {
    const newTime = {
      battery: this.timeForm.get("battery")?.value,
      championship: this.timeForm.get("championship")?.value,
      laptime: this.timeForm.get("model")?.value,
      start_1:this.timeForm.get("start_1")?.value,
      start_2:this.timeForm.get("start_2")?.value,
      start_3:this.timeForm.get("start_3")?.value,
      first_1:this.timeForm.get("first_3")?.value,
      first_2:this.timeForm.get("first_2")?.value,
      first_3:this.timeForm.get("first_3")?.value,
      first_4:this.timeForm.get("first_4")?.value,
      first_5:this.timeForm.get("first_5")?.value,
      second_1:this.timeForm.get("second_1")?.value,
      second_2:this.timeForm.get("second_2")?.value,
      second_3:this.timeForm.get("second_3")?.value,
      second_4:this.timeForm.get("second_4")?.value,
      second_5:this.timeForm.get("second_5")?.value,
      third_1:this.timeForm.get("third_1")?.value,
      third_2:this.timeForm.get("third_2")?.value,
      third_3:this.timeForm.get("third_3")?.value,
      third_4:this.timeForm.get("third_4")?.value,
      third_5:this.timeForm.get("third_5")?.value,
    };
        
    this.laptimeService
      .create(newTime)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (laptime) => {
          // this.submittingForm = false;
          this.toastrService.success(`${laptime.id} foi cadastrado!`, "Sucesso");
        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar ${this.timeForm.get("name")?.value}!`,
            "Erro"
          );

          console.log(errorResp);

          this.toastrService.danger(
            errorResp.error.description,
            errorResp.error.error
          );

          // this.submittingForm = false;
        }
      );
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
