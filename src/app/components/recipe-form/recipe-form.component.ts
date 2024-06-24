import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeDto } from '../../model/recipe-dto';
import { CommonModule } from '@angular/common';
import { IngredientService } from '../../service/ingredient.service';
import { IngredientDto } from '../../model/ingredient-dto';
import { Observable, of } from 'rxjs';
import { catchError, startWith, switchMap, tap } from 'rxjs/operators';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RecipeService } from '../../service/recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AutoCompleteModule, ButtonModule, InputTextModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  filteredIngredientsObservables: Observable<IngredientDto[]>[] = [];
  filteredIngredients: IngredientDto[][] = [];
  
  constructor(private fb: FormBuilder, 
    private ingredientService: IngredientService,
    private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      image: [''],
      quantities: this.fb.array([]),
      steps: this.fb.array([])
    });

    this.addQuantity(); // Add initial quantity input
  }

  get quantities(): FormArray {
    return this.recipeForm.get('quantities') as FormArray;
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  addQuantity() {
    const quantityGroup = this.fb.group({
      id: [''],
      quantity: [0, Validators.required],
      unit: ['', Validators.required],
      ingredient: [null, Validators.required]
    });

    this.quantities.push(quantityGroup);
    this.filteredIngredients.push([]);
  }

  addStep() {
    this.steps.push(this.fb.group({
      id: [''],
      description: ['', Validators.required]
    }));
  }

  removeQuantity(index: number) {
    this.quantities.removeAt(index);
    this.filteredIngredients.splice(index, 1);
    this.filteredIngredientsObservables.splice(index, 1);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  // Make this method public to be accessible from the template
  public _filter(value: string | null,index:number) {
    console.log('Filter value:', value); // Improved debug message
    if (value != null)
      this.ingredientService.searchIngredients(value).subscribe({
        next: data => {this.filteredIngredients[index] = data;},
        error: error =>{console.error('Error fetching recipes', error);}
      })
  }

  onIngredientSelect(event: any, index: number) {
    const selectedIngredient = event.value;
    this.quantities.at(index).get('ingredient')?.setValue(selectedIngredient);
  }

  displayFn(ingredient?: IngredientDto): string | undefined {
    return ingredient ? ingredient.name : undefined;
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const recipe: RecipeDto = this.recipeForm.value;
      console.log(recipe);
      this.recipeService.saveRecipe(recipe).subscribe({
        next: data => {console.log(data)}
      });
    }
  }
}