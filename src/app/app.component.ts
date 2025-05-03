import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Make sure CommonModule is imported

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule], // Include CommonModule and RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seminarska';

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/prijava']);
  }
}