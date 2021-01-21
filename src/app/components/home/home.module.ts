import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';

/* COMPONENTS */ 
import { HomeComponent } from './home.component';
import { SalasComponent } from '../individual/salas/salas.component';

/* MATERIAL */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';






@NgModule({
  declarations: [HomeComponent,SalasComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class HomeModule { }
