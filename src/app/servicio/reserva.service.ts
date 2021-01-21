import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservas } from '../components/models/Reservas';


@Injectable({
  providedIn: 'root'
})
export class reservaService {

  constructor(private afs: AngularFirestore) {
    this.reservaCollection = this.afs.collection<Reservas>('reserva');
  }

  private reservaCollection: AngularFirestoreCollection<Reservas>;
  private reservas: Observable<Reservas[]>;
  private reservaDoc: AngularFirestoreDocument<Reservas>;
  private reserva: Observable<Reservas>;
  public selectedReserva: Reservas = {
    id:null
  };


  getAllReservas(){
    this.reservaCollection = this.afs.collection<Reservas>('reserva');
    console.log(this.reservaCollection);
    return this.reservas = this.reservaCollection.snapshotChanges()
      .pipe(map(changes=>{
        return changes.map(action =>{
          const data = action.payload.doc.data() as Reservas;
          data.id = action.payload.doc.id;
          return data;
        })
      }))
  }

  getReservasForOneUser(idUser: string){
    this.reservaCollection = this.afs.collection<Reservas>('reserva', ref => ref.where('clienteId', '==', idUser));
    return this.reservas = this.reservaCollection.snapshotChanges()
      .pipe(map(changes=>{
        return changes.map(action =>{
          const data = action.payload.doc.data() as Reservas;
          data.id = action.payload.doc.id;
          return data;
        })
      }))
  }

  getOneReserva(idReserva: string){
    this.reservaDoc = this.afs.doc<Reservas>(`reserva/${idReserva}`);//looks for the book using the id given(used in the database/collections)
    return this.reserva = this.reservaDoc.snapshotChanges().pipe(map(action =>{
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as Reservas;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addReserva(reserva: Reservas): void {
    this.reservaCollection.add(reserva);
  }

  updateReserva(reserva: Reservas): void {
    let idReserva = reserva.id;
    this.reservaDoc= this.afs.doc<Reservas>(`reserva/${idReserva}`);
    this.reservaDoc.update(reserva);
   }

   deleteReserva(idReserva: string): void {
    this.reservaDoc = this.afs.doc<Reservas>(`reserva/${idReserva}`);
    this.reservaDoc.delete();
  }
  
}