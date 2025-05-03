import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-domov',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './domov.component.html',
  styleUrls: ['./domov.component.css'],
  animations: [
    trigger('bounceIn', [
      transition(':enter', [
        animate('0.8s ease-out', keyframes([
          style({ transform: 'translateY(100%)', opacity: 0, offset: 0 }),
          style({ transform: 'translateY(-15px)', opacity: 1, offset: 0.6 }),
          style({ transform: 'translateY(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class DomovComponent implements OnInit {
  recipes: any[] = [];
  imagesLoaded: number = 0;
  totalImages: number = 0;
  isLoggedIn: boolean = false;  // Track login status

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Check login status
    this.isLoggedIn = !!localStorage.getItem('userToken');  // Or use your authentication method to set this value

    // Fetch the recipes from the backend API
    this.http.get<any[]>('http://localhost:3000/recepti').subscribe(
      (data) => {
        console.log('Fetched recipes:', data);
        this.recipes = data;
        this.totalImages = data.length;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
        this.recipes = [
          {
            id: 1,
            imeRecepta: 'Testni Recept',
            slika: null
          }
        ];
        this.totalImages = 1;
      }
    );
  }

  imageLoaded(): void {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.totalImages) {
      this.allImagesLoaded();
    }
  }

  allImagesLoaded(): void {
    console.log('All images have been loaded');
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
