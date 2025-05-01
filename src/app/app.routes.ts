import { Routes } from '@angular/router';
import { DomovComponent } from './domov/domov.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { PrijavaComponent } from './prijava/prijava.component';

export const routes: Routes = [
    {path: '', component: DomovComponent},
    {path: 'dodaj', component: DodajComponent},
    {path: 'prijava', component: PrijavaComponent}
];


