import { Category } from "../shared/models/category-model";
import { CategoryService } from "../shared/services/category.service";
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

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
})

export class CategoryFormComponent
  implements OnInit, OnDestroy, AfterContentChecked {
  private unsubscribe$ = new Subject<void>();
  categoryForm!: UntypedFormGroup;
  categories: Category[] = [];
  pageTitle: string = "Cadastro de categoria";

  constructor(
    private formBuilder: UntypedFormBuilder,
    private categoryService: CategoryService,
    private toastrService: NbToastrService ) { }

  ngOnInit(): void {
    this.getCategories();
    this.buildCategoryForm();
  }
  ngAfterContentChecked() {
    // this.setPageTitle();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  submitForm() {
    this.createCategory();
  }
  
  private setCurrentAction() {
    // if (this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    // else this.currentAction = "edit";
  }
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      name: [null],
      description: [null],
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

  private createCategory() {
    const newCategory = {
      name: this.categoryForm.get("name")?.value,
      description: this.categoryForm.get("description")?.value,
    };

    this.categoryService
      .create(newCategory)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (category) => {
          this.toastrService.success(`${category.name} foi cadastrado!`, "Sucesso");
        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar categoria ${this.categoryForm.get("name")?.value}!`,
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
