import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DialogDataSala } from '../models/Sala';
import { reservaService } from '../../servicio/reserva.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  minDate: Date;
  dateFormat: String;

  formReserva = new FormGroup({
    id: new FormControl(0),
    clienteId: new FormControl('', Validators.required),
    salaId: new FormControl('', Validators.required),
    diaQueHizoReserva: new FormControl('', Validators.required),
    fechaReservada: new FormControl('', Validators.required),
    horaComienzo: new FormControl('', [Validators.required]),
    horaFinal: new FormControl('', Validators.required)
  });

  myDate = new Date(); //agarra el dia actual

  constructor(private datePipe: DatePipe, public reservaSvc: reservaService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDataSala) { 
    // Lo sigiuente lo que hace es busco el año, mes y dia actual para usarlo como condición para la fecha minima para el selector de fecha.
    
    const currentYear = new Date().getFullYear(); // busco el año
    const month = new Date().getMonth(); // busco el mes
    // busco la fecha actual y borro todo menos el dia
    const day = new Date();
    const dayInString = this.datePipe.transform(day, 'yyyy-MM-dd')
    const DayInNumber = Number(dayInString.substr(8,2));
    
    this.minDate = new Date(currentYear - 0, month,DayInNumber);

  }

  ngOnInit(): void {

    this.formReserva.setValue({ // inicializo el formgroup
      id: this.reservaSvc.selectedReserva.id,
      clienteId: this.data.clienteId,
      salaId: this.data.salaId,
      diaQueHizoReserva: '',
      fechaReservada: '',
      horaComienzo: '',
      horaFinal: '',
    })
    
  }

  onSave(formReserva: FormGroup): void { //verifico que operacion voy hacer

    const horaFinal = this.AgregarUnaHora(this.formReserva.value.horaComienzo); // agrego una hora a la hora selecionada

    if(this.formReserva.value.horaComienzo == "" || this.formReserva.value.fechaReservada == null){ // validación manual
      alert('Debe llenar todos los campos')
      
    }else{
      if (formReserva.value.id == undefined) { // Este if es selecionar si es un update o una reserva nueva.
      // Agregar

        this.formReserva.setValue({
          id:this.formReserva.value.id,
          clienteId: this.formReserva.value.clienteId,
          salaId: this.formReserva.value.salaId,
          diaQueHizoReserva: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
          fechaReservada: this.datePipe.transform(this.formReserva.value.fechaReservada, 'yyyy-MM-dd'),
          horaComienzo: this.formReserva.value.horaComienzo,
          horaFinal: horaFinal,
        })
        
        this.reservaSvc.addReserva(formReserva.value);

      }/* else {
        //Modificar

        this.formReserva.setValue({
          id:this.formReserva.value.id,
          clienteId: this.formReserva.value.clienteId,
          salaId: this.formReserva.value.salaId,
          diaQueHizoReserva: this.formReserva.value.diaQueHizoReserva,
          fechaReservada: this.datePipe.transform(this.formReserva.value.fechaReservada, 'yyyy-MM-dd'),
          horaComienzo: this.formReserva.value.horaComienzo,
          horaFinal: horaFinal,
        })

        this.reservaSvc.updateReserva(formReserva.value);
      }*/

    }
    
    formReserva.reset();
    this.dialogRef.close();
    
  }

  AgregarUnaHora(hora: string) { 

    const cortar = hora.indexOf(":");
    const horaMasUno = Number(hora.substr(0,cortar))+ 1;
    let horaNueva="";
    
    if(horaMasUno == 12){ // cuando llega a 11am debe agregar una hora y cambiar de am a pm
      const espacio = hora.indexOf(" ")
      horaNueva = horaMasUno.toString() + hora.substr(cortar,espacio-1)+"PM";
    }else{
      horaNueva = horaMasUno.toString() + hora.substr(cortar,10);
    }

    return horaNueva;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
