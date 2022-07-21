import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Reservacion } from '../models/reservacion.model';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerRervaciones(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(this.url + '/reservaciones-usuario', { headers: headersToken })
  }

  agregarReservacion(id:String, reservacionModel: Reservacion, token): Observable<any> {
    let parametros = JSON.stringify(reservacionModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/crear-reservacion/' + id, parametros, {headers: headersToken})
  }

  obtenerRervacionId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/reservaciones/' + id, {headers: headersToken})
  }
}