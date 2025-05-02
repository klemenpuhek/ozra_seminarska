import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-recept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recept.component.html',
  styleUrls: ['./recept.component.css']
})
export class ReceptComponent implements OnInit {
  recipe: any;  // Store the recipe object
  imageLoaded: boolean = false;  // Flag to track image loading

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');  // Get the ID from the URL

    // Fetch the recipe details using the ID
    this.http.get<any>(`http://localhost:3000/recepti/${recipeId}`).subscribe(
      (data) => {
        this.recipe = data;  // Store the fetched recipe data
      },
      (error) => {
        console.error('Error fetching recipe:', error);
      }
    );
  }

  onImageLoad(): void {
    this.imageLoaded = true;  // Set the flag to true when the image is loaded
  }
}