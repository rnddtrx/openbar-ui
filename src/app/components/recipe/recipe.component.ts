import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit{

constructor(private route: ActivatedRoute){}
id:string|undefined|null 

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.id = params.get('id');
  });
}

}
