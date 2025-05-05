import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recept-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './recept-list.component.html',
  styleUrls: ['./recept-list.component.css']
})
export class ReceptListComponent implements OnInit {
  recipes: any[] = [];
  private loggedInStatus: boolean = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    this.http.get<any[]>('http://localhost:3000/recepti').subscribe(
      (data) => {
        this.recipes = data;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  checkLoginStatus(): void {
    this.loggedInStatus = !!localStorage.getItem('userToken');
    this.cdr.detectChanges();
  }

  get isLoggedIn(): boolean {
    return this.loggedInStatus;
  }

  deleteRecipe(id: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.http.delete(`http://localhost:3000/recepti/${id}`).subscribe(
        () => {
          this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        },
        (error) => {
          console.error('Error deleting recipe:', error);
        }
      );
    }
  }
}