
import { CarService } from "./../shared/services/car.service";
import { Category } from "./../shared/models/category-model";
import { CategoryService } from "./../shared/services/category.service";
import { ChampionshipService } from "./../shared/services/championship.service";
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

@Component({
  selector: 'app-championship-form',
  templateUrl: './championship-form.component.html',
  styleUrls: ['./championship-form.component.scss']
})
export class ChampionshipFormComponent
  implements OnInit, OnDestroy, AfterContentChecked{
  private unsubscribe$ = new Subject<void>();
  championshipForm!: UntypedFormGroup;
  pageTitle: string = "Cadastro de campeonato";
  categories: Category[] = [];
  constructor(
    private formBuilder: UntypedFormBuilder,
    private categoryService: CategoryService,
    private championshipService: ChampionshipService,
    private toastrService: NbToastrService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.buildChampionshipForm();
  }
  ngAfterContentChecked() {
    // this.setPageTitle();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  submitForm() {
    this.createChampionship();
  }
  private setCurrentAction() {
    // if (this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    // else this.currentAction = "edit";
  }

  private buildChampionshipForm() {
    this.championshipForm = this.formBuilder.group({
      name: [null],
      category: [null],
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
  private createChampionship() {
    const newChampionship = {
      name: this.championshipForm.get("name")?.value,
      categoryId: this.championshipForm.get("category")?.value,
    };
    this.championshipService
      .create(newChampionship)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (championship) => {
          // this.submittingForm = false;
          this.toastrService.success(`${championship.name} foi cadastrado!`, "Sucesso");
        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar ${this.championshipForm.get("name")?.value}!`,
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
