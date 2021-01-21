import { Time } from "@angular/common";
export interface Reservas{
    id:string;
    clienteId?:string;
    salaId?:string;
    diaQueHizoReserva?:Date;
    fechaReservada?:Date;
    horaComienzo?:Time;
    horaFinal?:Time;
 }