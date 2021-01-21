import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicio/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authSvc: AuthService, private router: Router, private afAuth: AngularFireAuth) { }

  registerForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  ngOnInit(): void {
  }

  onRegister(form:Cliente){
    this.authSvc.registerUser(form) // despues de registar el usuario redirecta al home page
      .then((res)=>{
        
        this.router.navigate(['/']); 
                  
      }).catch(err=>console.log("err",err.message));
        
  }

  getErrorMessageEmail() {
    if (this.registerForm.value.email.hasError('required')) {
      return 'You must enter a value';
    }else{
      return this.registerForm.value.email.hasError('email') ? 'Not a valid email' : '';
    }
  }

  getErrorMessagePassword() {
    if (this.registerForm.value.password.hasError('required')) {
      return 'You must enter a value';
    }
      
  }
}
