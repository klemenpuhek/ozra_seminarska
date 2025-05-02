import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngFor

@Component({
  selector: 'app-domov',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './domov.component.html',
  styleUrls: ['./domov.component.css']
})
export class DomovComponent implements OnInit {
  recipes: any[] = [];
  imagesLoaded: number = 0;  // Track the number of loaded images
  totalImages: number = 0;   // Total number of images

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/recepti').subscribe(
      (data) => {
        console.log('Fetched recipes:', data);
        this.recipes = data;
        this.totalImages = data.length;  // Set total images to the number of recipes
      },
      (error) => {
        console.error('Error fetching recipes:', error);

        // Optional: fallback dummy data for development
        this.recipes = [
          {
            id: 1,
            imeRecepta: 'Testni Recept',
            slika: null
          }
        ];
        this.totalImages = 1;  // Handle fallback case
      }
    );
  }

  imageLoaded(): void {
    this.imagesLoaded++;  // Increment the counter when an image is loaded
    if (this.imagesLoaded === this.totalImages) {
      this.allImagesLoaded();  // All images are loaded
    }
  }

  allImagesLoaded(): void {
    console.log('All images have been loaded');
    // You can now perform any additional actions after images are loaded.
    // For example, enable a button or show some content.
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