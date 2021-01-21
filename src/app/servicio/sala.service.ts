import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sala } from '../components/models/Sala';


@Injectable({
  providedIn: 'root'
})
export class salaService {

  constructor(private afs: AngularFirestore) {}

  private salaCollection: AngularFirestoreCollection<Sala>;
  private salas: Observable<Sala[]>;

  getAllSalas(){
    this.salaCollection = this.afs.collection<Sala>('sala');
    return this.salas = this.salaCollection.snapshotChanges()
      .pipe(map(changes=>{
        return changes.map(action =>{
          const data = action.payload.doc.data() as Sala;
          data.id = action.payload.doc.id;
          return data;
        })
      }))
  }

  getOneSala(id:Sala):Observable<Sala>{
    return this.afs.doc<Sala>(`sala/${id}`).valueChanges();
  }
/*
getOneBook(idBook: string){
    this.bookDoc=this.afs.doc<BookInterface>(`books/${idBook}`);//looks for the book using the id given(used in the database/collections)
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action =>{
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as BookInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }
*/

}
