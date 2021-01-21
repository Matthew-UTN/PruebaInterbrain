import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallesSalaComponent } from './components/detalles-sala/detalles-sala.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';




const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  {path: 'sala/:id', component:DetallesSalaComponent},
  {path: 'login',component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'RandomModule', loadChildren: () => import('./components/modal/modal.module').then(m => m.ModalModule) },
  {path: 'profile/:id', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
