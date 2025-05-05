import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registracija',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Prosimo izpolnite vsa polja.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Gesli se ne ujemata.';
      return;
    }

    const user = { email: this.email, password: this.password };

    this.http.post('http://localhost:3000/register', user).subscribe({
      next: (response: any) => {
        this.successMessage = 'Registracija uspešna! Preusmerjanje...';
        localStorage.setItem('userToken', response.token);
        setTimeout(() => this.router.navigate(['/prijava']), 1500);
      },
      error: (error) => {
        console.error('Full registration error:', error);
        this.errorMessage = error.error?.error || 'Napaka pri registraciji.';
      }
    });
  }
}