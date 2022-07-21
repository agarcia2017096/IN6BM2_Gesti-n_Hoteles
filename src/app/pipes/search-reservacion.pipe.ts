import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchReservacion'
})
export class SearchReservacionPipe implements PipeTransform {

  transform(reservacion: any, serchReservacion:any): unknown {
    if(serchReservacion == undefined){
      return reservacion;
    } else {
      return reservacion.filter((reservaciones=>{
        return JSON.stringify(reservaciones).toLowerCase().includes(serchReservacion.toLowerCase());
      }))
    }
  }
}
