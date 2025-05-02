import { Routes } from '@angular/router';
import { DomovComponent } from './domov/domov.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ReceptComponent } from './recept/recept.component';
import { UrediComponent } from './uredi/uredi.component';
import { ReceptListComponent } from './recept-list/recept-list.component';  // Import the ReceptListComponent

export const routes: Routes = [
  { path: '', component: DomovComponent },
  { path: 'dodaj', component: DodajComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'recepti', component: ReceptListComponent }, // Add route for ReceptList
  { path: 'recepti/:id', component: ReceptComponent },
  { path: 'uredi/:id', component: UrediComponent }
];