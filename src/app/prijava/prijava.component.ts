import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing

@Component({
  selector: 'app-prijava',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Include RouterModule
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Prosimo vpišite vse podatke.';
      return;
    }

    const user = { email: this.email, password: this.password };

    this.http.post('http://localhost:3000/login', user).subscribe({
      next: (response: any) => {
        localStorage.setItem('userToken', response.token); // Save the token after login
        this.router.navigate(['/']); // Navigate to home or dashboard after login
      },
      error: (error) => {
        console.error('Login error:', error); // ✅ Help debug in console
        this.errorMessage = error.error?.error || 'Napaka pri prijavi.';
      }
    });
  }
}