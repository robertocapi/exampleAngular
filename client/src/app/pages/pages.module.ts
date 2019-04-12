
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';


// Pipe Module
import { PipesModule } from '../pipes/pipes.module';



import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';

import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { AparadoresComponent } from './aparadores/aparadores.component';
import { AparadorComponent } from './aparadores/aparador.component';
import { ProfileAparComponent } from './aparadores/profileApar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        AccoutSettingsComponent,
        RxjsComponent,
        ProfileComponent,
        ProfileAparComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        PublicacionesComponent,
        AparadoresComponent,
        AparadorComponent,
        BusquedaComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
  
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class PagesModule { }
