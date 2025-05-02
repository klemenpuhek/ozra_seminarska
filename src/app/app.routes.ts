import { Routes } from '@angular/router';
import { DomovComponent } from './domov/domov.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ReceptComponent } from './recept/recept.component';
import { UrediComponent } from './uredi/uredi.component';

export const routes: Routes = [
    {path: '', component: DomovComponent},
    {path: 'dodaj', component: DodajComponent},
    {path: 'prijava', component: PrijavaComponent},
    {path: 'registracija', component: RegistracijaComponent},
    {path: 'recept', component: ReceptComponent},
    {path: 'uredi', component: UrediComponent}
];

