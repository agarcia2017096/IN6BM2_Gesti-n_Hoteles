import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventos } from '../models/eventos.model';
import { Servicios } from '../models/servicios.model';

@Injectable({
  providedIn: 'root'
})
export class InformacionHotelService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(public _http: HttpClient) { }

  ObtenerHabitaciones(idHotel,token){
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/habitaciones/' + idHotel, { headers: headersToken });
  }

  ObtenerHabitacionesId(id){
    return this._http.get(this.url + '/habitacion/'+ id, {headers: this.headersVariable});
  }

  ObtenerServicios(idHotel,token){
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/servicios/' + idHotel, { headers: headersToken });
  }



  ObtenerServiciosId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/servicioId/' + id, { headers: headersToken })
  }

  ObtenerEventos(idHotel,token){
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/eventos/' + idHotel, { headers: headersToken });
  }

  ObtenerEventosId(id){
    return this._http.get(this.url + '/evento/' + id, {headers: this.headersVariable});
  }

  registrarEventos(idHotel, params, token) {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.post(this.url + '/crear-evento/' + idHotel, params, { headers: headersToken});
  }

  registrarServicios(idHotel, params, token){
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.post(this.url + '/agregarServicios/' + idHotel, params, { headers: headersToken});
  }

  registrarHabitaciones(idHotel, params, token){
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.post(this.url + '/crear-habitacion/' + idHotel, params, { headers: headersToken})
  }

  editarServicio(id, params, token){
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.put(this.url + '/editarServicios/' + id, params, { headers:headersToken})
  }

  editarEvento(id, params, token){
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.put(this.url + '/editar-evento/' + id, params, { headers:headersToken});
  }

  editarHabitacion(id, params, token) {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.put(this.url + '/editar-habitacion/' + id, params, { headers:headersToken});
  }

  eliminarServicio(id, token){
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + '/eliminarServicios/' + id, { headers:headersToken})
  }

  eliminarEvento(id, token){
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + '/eliminar-evento/' + id, { headers:headersToken})
  }
  
  eliminarHabitacion(id, token) {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/eliminar-habitacion/' + id, { headers:headersToken})
  }
  comprarEvento(id: String, EventoModel: Eventos, token): Observable<any> {
    let parametros = JSON.stringify(EventoModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/comprar-evento/' + id, parametros, { headers: headersToken })
  }
  comprarServicio(id: String, ServicioModel: Servicios, token): Observable<any> {
    let parametros = JSON.stringify(ServicioModel);
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.post(this.url + '/comprarServicios/' + id, parametros, { headers: headersToken })
  }
}



