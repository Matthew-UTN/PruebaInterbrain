import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicio/auth.service';
import { Cliente } from '../../models/Cliente';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  ngOnInit() {
  }

  onLogin(form:Cliente){
    this.authSvc.loginPorEmail(form).then(res=>{ //mando el formulario que contiene el correo y contraseña
      this.router.navigate(['/']);
    }).catch(err => console.log('error',err))
  }

  getErrorMessageEmail() {
    if (this.loginForm.value.email.hasError('required')) { // si el correo tiene un error avisa al usuario
      return 'You must enter a value';
    }else{
      return this.loginForm.value.email.hasError('email') ? 'Not a valid email' : '';
    }
  }

  getErrorMessagePassword() {
    if (this.loginForm.value.password.hasError('required')) { // si la contraseña tiene un error avisa al usuario
      return 'You must enter a value';
    }
      
  }
}
