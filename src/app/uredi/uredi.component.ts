import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-uredi',
  templateUrl: './uredi.component.html',
  styleUrls: ['./uredi.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class UrediComponent implements OnInit {
  recipeId!: number;
  recipeForm: FormGroup;
  selectedImage: File | null = null;  // <- New field to store uploaded file

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      imeRecepta: ['', Validators.required],
      casPriprave: ['', [Validators.required, Validators.min(1)]],
      tezavnost: ['', Validators.required],
      sestavine: ['', Validators.required],
      opis: ['', Validators.required]
      // slika is removed from here
    });
  }

  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<any>(`http://localhost:3000/recepti/${this.recipeId}`).subscribe(
      (data) => {
        this.recipeForm.patchValue(data);
      },
      (error) => {
        console.error('Error loading recipe:', error);
      }
    );
  }

  // This method is triggered when a file is selected
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
    }
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const updatedRecipe = this.recipeForm.value;
      const formData = new FormData();

      // Append regular form fields
      for (const key in updatedRecipe) {
        formData.append(key, updatedRecipe[key]);
      }

      // Append image if it was selected
      if (this.selectedImage) {
        formData.append('slika', this.selectedImage);
      }

      this.http.put(`http://localhost:3000/recepti/${this.recipeId}`, formData).subscribe(
        () => {
          this.router.navigate(['/recepti']);
        },
        (error) => {
          console.error('Error updating recipe:', error);
        }
      );
    }
  }
}