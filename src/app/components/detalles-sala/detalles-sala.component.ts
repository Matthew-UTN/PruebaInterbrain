import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { salaService } from '../../servicio/sala.service';
import { Observable } from 'rxjs';
import { Sala } from '../models/Sala';
import { AuthService } from 'src/app/servicio/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-detalles-sala',
  templateUrl: './detalles-sala.component.html',
  styleUrls: ['./detalles-sala.component.css']
})

export class DetallesSalaComponent implements OnInit {

  public sala$: Observable<Sala>;
  clienteId: string;
  salaId: string;

  constructor(private route: ActivatedRoute, private salaSVC: salaService,public authSvc: AuthService, public dialog: MatDialog) { }

  openDialog(): void {
    this.getCurrentUser();
    this.salaId = this.route.snapshot.params.id // necesito el id de la sala para la reserva
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '600px',
      width: '400px',
      data: {clienteId: this.clienteId, salaId: this.salaId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public userUid: string = null;

  ngOnInit() {
    const idSala = this.route.snapshot.params.id;
    this.sala$ = this.salaSVC.getOneSala(idSala);
    this.getCurrentUser();
  }

  getCurrentUser(){ // necesito el id del usuario para poder agregarlo a la reserva
    this.authSvc.userData.subscribe(auth=>{
      if(auth){
        this.clienteId=auth.uid;
      }
    })
  }

}
