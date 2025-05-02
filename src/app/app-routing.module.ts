import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomovComponent } from './domov/domov.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';

export const routes: Routes = [
    {path: '', component: DomovComponent},
    {path: 'dodaj', component: DodajComponent},
    {path: 'prijava', component: PrijavaComponent},
    {path: 'registracija', component: RegistracijaComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
