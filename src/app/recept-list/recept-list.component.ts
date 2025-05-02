import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngFor

@Component({
  selector: 'app-recept-list',
  standalone: true,  // This is a standalone component
  imports: [RouterModule, CommonModule],  // Include CommonModule for directives like ngFor
  templateUrl: './recept-list.component.html',
  styleUrls: ['./recept-list.component.css']
})
export class ReceptListComponent implements OnInit {
  recipes: any[] = [];  // Declare an array to store the recipes

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch the recipes from the backend API
    this.http.get<any[]>('http://localhost:3000/recepti').subscribe(
      (data) => {
        this.recipes = data;  // Store the fetched recipes in the recipes array
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  deleteRecipe(id: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.http.delete(`http://localhost:3000/recepti/${id}`).subscribe(
        () => {
          // Remove the deleted recipe from the local list
          this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        },
        (error) => {
          console.error('Error deleting recipe:', error);
        }
      );
    }
  }
}