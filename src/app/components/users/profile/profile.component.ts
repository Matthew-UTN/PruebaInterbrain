import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { Cliente } from '../../models/Cliente';
import { reservaService } from '../../../servicio/reserva.service';
import { Reservas } from '../../models/Reservas';
import { AuthService } from '../../../servicio/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { Sala } from '../../models/Sala';
import { salaService } from '../../../servicio/sala.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['Sala', 'Dia de la reserva', 'Hora de la reserva', 'Acciones'];

 
  public profile$: Observable<Cliente>;
  public reservaArray: Reservas[];
  public salas: Sala[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  
  constructor(private route: ActivatedRoute, private reservaSVC: reservaService, private authSvc: AuthService, public dialog: MatDialog, private salaSvc:salaService) {
    
   }

  ngOnInit(){
      const idProfile = this.route.snapshot.params.id;
      this.getReservas(idProfile);
      this.profile$ = this.authSvc.getCurrentUser(idProfile);
      this.getSalas();
      //this.cambiarSalaNombres();
  }

  getSalas(){
    this.salaSvc.getAllSalas().subscribe(salas => this.salas = salas)
    
  }

  getReservas(idProfile){
    this.reservaSVC.getReservasForOneUser(idProfile).subscribe(reservas => this.reservaArray = reservas)
  
  }

  onDeleteReserva(idReserva: string){
    
    Swal.fire({
      title: 'Estas seguro que quieres eliminar esta reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaSVC.deleteReserva(idReserva);
        Swal.fire(
          'Eliminado!',
          'Eliminaste la reserva.',
          'success'
        )
      }
    })
  }

  cambiarSalaNombres() {
  
    this.reservaArray.forEach((e)=>{
      let salaobj = this.salas.find(x => x.id === e.salaId)
      e.salaId = salaobj.nombre;
      console.log(e.salaId)
    })
  }

}
