import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(public _http: HttpClient) { }

  ObtenerRegistro(token){
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/registro', { headers: headersToken});
  }

  ObtenerRegistroHotel(idHotel,token){
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/registroHotel/'+idHotel, { headers: headersToken});
  }

  EliminarRegistro(nombre, token){
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/eliminar-registro/' + nombre, { headers: headersToken})
  }
}
