import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dodaj',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dodaj.component.html',
  styleUrls: ['./dodaj.component.css']
})
export class DodajComponent {
  @ViewChild('slikaInput') slikaInput!: ElementRef;

  constructor(private http: HttpClient) {}

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent page reload
  
    const form = event.target as HTMLFormElement;
  
    // Get form data
    const imeRecepta = (form.querySelector('#imeRecepta') as HTMLInputElement).value;
    const casPriprave = +(form.querySelector('#casPriprave') as HTMLInputElement).value;
    const tezavnost = (form.querySelector('#tezavnost') as HTMLSelectElement).value;
    const sestavine = (form.querySelectorAll('#opis')[0] as HTMLTextAreaElement).value;
    const opis = (form.querySelectorAll('#opis')[1] as HTMLTextAreaElement).value;
    
    // Get the image file
    const slikaFile = (form.querySelector('#slika') as HTMLInputElement).files?.[0];
  
    console.log('Form data:', { imeRecepta, casPriprave, tezavnost, sestavine, opis });
    console.log('Image file:', slikaFile);
  
    // Create FormData object to send both text data and the file
    const formData = new FormData();
    formData.append('imeRecepta', imeRecepta);
    formData.append('casPriprave', casPriprave.toString());
    formData.append('tezavnost', tezavnost);
    formData.append('sestavine', sestavine);
    formData.append('opis', opis);
    if (slikaFile) {
      formData.append('slika', slikaFile);
    }
  
    // Send POST request to the backend
    this.http.post('http://localhost:3000/recepti', formData).subscribe({
      next: (res) => {
        alert('Recept uspešno dodan!');
        form.reset(); // Reset the form after success
      },
      error: (err) => {
        console.error('Napaka pri shranjevanju recepta:', err);
        alert('Napaka pri dodajanju recepta.');
      }
    });
  }
}