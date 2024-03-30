import { CarService } from "./../shared/services/car.service";
import { Category } from "./../shared/models/category-model";
import { CategoryService } from "./../shared/services/category.service";
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
import { Car } from "../shared/models/car-model";

@Component({
  selector: "app-car-form",
  templateUrl: "./car-form.component.html",
  styleUrls: ["./car-form.component.scss"],
})
export class CarFormComponent
  implements OnInit, OnDestroy, AfterContentChecked{
  private unsubscribe$ = new Subject<void>();
  carForm!: UntypedFormGroup;
  carForm1!: UntypedFormGroup;
  pageTitle: string = "Cadastro de carro";
  pageTitle2: string = "Mandar Carro para a Pista";
  categories: Category[] = [];
  cars: Car[] = [];
  ontrack: Car[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private categoryService: CategoryService,
    private carService: CarService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.buildCarDeleteForm();
    this.buildCarForm();
    this.getCars();
    this.getOntrack();
  }

  ngAfterContentChecked() {
    // this.setPageTitle();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submitForm() {
    this.createCar();
  }
 deleteForm(){
  this.deleteCar();
 }
 sendForm(){
  this.sendCar();
 }
 getback(){
  this.takeCar();
 }
  private setCurrentAction() {
    // if (this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    // else this.currentAction = "edit";
  }

  private buildCarForm() {
    this.carForm = this.formBuilder.group({
      model: [null],
      name: [null],
      owner: [null],
      plate: [null],
      category: [null],
    });
    
  }
  private buildCarDeleteForm() {
    this.carForm1 = this.formBuilder.group({
      car: [null],
    });
  }
  getCategories() {
    this.categoryService
      .getAll().pipe(takeUntil(this.unsubscribe$)).subscribe(
        (ans: any) => {
          this.categories = ans;
          console.log(this.categories);
        },
        (error) => {
          alert("Não foi possível obter as categorias.");
        }
      );
  }
 

  getOntrack(){
    this.carService
      .getCurrentCarTrack().pipe(takeUntil(this.unsubscribe$)).subscribe(
        (ans: any)=>{
          this.ontrack= ans;
          console.log(this.ontrack);
        },
        (error) => {
          alert("Não foi possível obter os carros na pista.");
        }
      )
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
  private createCar() {
    const newCar = {
      name: this.carForm.get("name")?.value,
      model: this.carForm.get("model")?.value,
      owner: this.carForm.get("owner")?.value,
      plate: this.carForm.get("plate")?.value,
      category_id: this.carForm.get("category")?.value,
      
    };
    this.carService
      .create(newCar)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (car) => {
          // this.submittingForm = false;
          this.toastrService.success(`${car.name} foi cadastrado!`, "Sucesso");
        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar ${this.carForm.get("name")?.value}!`,
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
  private deleteCar(){
    const  deleteCar={
    car: this.carForm1.get("car")?.value,}

    console.log(deleteCar.car);
    this.carService.delete(deleteCar.car).pipe(takeUntil(this.unsubscribe$)).subscribe((error) => {
           alert("Não foi possível obter os carros.");});
  }
  private sendCar(){
    const  sendCar={
      car: this.carForm1.get("car")?.value,}
      console.log(sendCar.car);
      this.carService.sendToTrack(sendCar).pipe(takeUntil(this.unsubscribe$)).subscribe(
         (car) => {
        // this.submittingForm = false;
        this.toastrService.success(`${sendCar.car} foi cadastrado!`, "Sucesso");
      },
      (errorResp) => {
        this.toastrService.danger(
          `Falha ao cadastrar ${this.carForm.get("car")?.value}!`,
          "Erro"
        );

        console.log(errorResp);

        this.toastrService.danger(
          errorResp.error.description,
          errorResp.error.error
        );

        // this.submittingForm = false;
      });
  }
  private takeCar(){
    const  takeCar={
      car: this.carForm1.get("car")?.value,}
      console.log(takeCar.car);
      this.carService.takeTrack(takeCar).pipe(takeUntil(this.unsubscribe$)).subscribe(
         (car) => {
        // this.submittingForm = false;
        this.toastrService.success(`${takeCar.car} Foi retirado da Pista!`, "Sucesso");
      },
      (errorResp) => {
        this.toastrService.danger(
          `Falha ao cadastrar ${this.carForm.get("car")?.value}!`,
          "Erro"
        );

        console.log(errorResp);

        this.toastrService.danger(
          errorResp.error.description,
          errorResp.error.error
        );

        // this.submittingForm = false;
      });
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
