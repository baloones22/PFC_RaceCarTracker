import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CarService } from "../shared/services/car.service";
import { Championship, ChampionshipService } from "../shared/services/championship.service";
import { RoundService } from "../shared/services/round.service";
import { Car } from "../shared/models/car-model";

@Component({
  selector: "app-round-form",
  templateUrl: "./round-form.component.html",
  styleUrls: ["./round-form.component.scss"],
})

export class RoundFormComponent
  implements OnInit, OnDestroy, AfterContentChecked {
  private unsubscribe$ = new Subject<void>();
  roundForm!: UntypedFormGroup;
  cars: Car[] = [];
  pageTitle: string = "Cadastro de bateria";
  championships: Championship[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private championshipService: ChampionshipService,
    private roundService: RoundService,
    private carService: CarService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getChampionships();
    this.getCars();
    this.buildRoundForm();
  }

  ngAfterContentChecked() {
    // this.setPageTitle();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submitForm() {
    this.createRound();
  }
  private setCurrentAction() {
    // if (this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    // else this.currentAction = "edit";
  }

  private buildRoundForm() {
    this.roundForm = this.formBuilder.group({
      name: [null],
      championship: [null],
      car: [null],
    });
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
  getCars() {
    this.carService
      .getAll().pipe(takeUntil(this.unsubscribe$)).subscribe(
        (ans: any) => {
          this.cars = ans;
          console.log(this.cars);
        },
        (error) => {
          alert("Não foi possível obter os carros.");
        }
      );
  }

  private createRound() {
    const newRound = {

      "name": this.roundForm.get("name")?.value,
      "championshipId": this.roundForm.get("championship")?.value,
      "carId": this.roundForm.get("car")?.value,
    }
    this.roundService
      .create(newRound)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (round) => {
          this.toastrService.success(`${round.name} foi cadastrado!`, "Sucesso");
        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar bateria ${this.roundForm.get("name")?.value}!`,
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
  private markFormGroupTouched(formGroup: UntypedFormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
