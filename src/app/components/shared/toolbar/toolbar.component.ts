import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicio/auth.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/Cliente';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isLogged: boolean;

  clienteId: string;

  public clienteAux: Cliente;

  constructor(public authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  onLogout(){
    Swal.fire({
      title: 'Estas seguro que quieres salir de tu cuenta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authSvc.logout();
        Swal.fire(
          'Exito!',
          'Saliste de tu cuenta.',
          'success'
        )
        this.router.navigate(['/']);
      }
    })
    
  }

  profile(): void{
    this.router.navigate(['/profile', this.clienteId]);
  }

  getCurrentUser(){
    this.authSvc.userData.subscribe(auth=>{
      if(auth){
        this.clienteId=auth.uid;
      }
    })
  }

}
