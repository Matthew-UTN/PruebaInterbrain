import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sala } from '../../models/Sala';


@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  @Input() salaAux:Sala;
  @Input() index:number;

  @Output() salaSeleccionada:EventEmitter<number>;

  constructor() { }

  

  ngOnInit(): void {
  }

}
