import { Injectable } from '@angular/core';
import { Cliente } from '../components/models/Cliente';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public userData:Observable<firebase.default.User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.userData = afAuth.authState;
   }

  loginPorEmail(cliente:Cliente){
    const {email,password} = cliente;
    return this.afAuth.signInWithEmailAndPassword(email,password);

  }

  registerUser(cliente:Cliente){
    const {email,password} = cliente;
    return new Promise((resolve, reject)=>{
      this.afAuth.createUserWithEmailAndPassword(email,password)
      .then(userdata=>{resolve(userdata),
        this.updateUserData(userdata.user)
      }).catch(err=>console.log(reject(err)))
    });
    
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    console.log("i made it",userRef);
    const data: Cliente={
      id:user.uid,
      email: user.email
    }
    return userRef.set(data,{merge:true});
  }

  getCurrentUser(id:Cliente):Observable<Cliente>{
    return this.afs.doc<Cliente>(`users/${id}`).valueChanges()
  }

  logout(){
    this.afAuth.signOut();
  }
}
