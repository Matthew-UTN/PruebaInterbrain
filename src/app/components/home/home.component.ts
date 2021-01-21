import { Component, OnInit } from '@angular/core';
import { Sala } from '../models/Sala';
import { Observable } from 'rxjs';

/* SERVICE */
import {salaService} from '../../servicio/sala.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public salaArray: Sala[];
  
  public salas$: Observable<Sala[]>;

  constructor(private salaSvc: salaService) { }

  ngOnInit(): void {
    this.salas$ = this.salaSvc.getAllSalas();
  }

}
