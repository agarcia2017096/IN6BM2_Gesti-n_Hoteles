import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hoteles} from '../models/hoteles.model'

@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) { }

  ObtenerHoteles(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/hoteles/', { headers: headersToken })
  }

  ObtenerTableroHoteles():Observable<any>{
    return this._http.get(this.url+'/taleroHoteles')
  }
  
  

  ObtenerHotelesUser(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/hotelesUser/', { headers: headersToken })
  }

  ObtenerHotelesId( idHotel,token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/hotelId/' + idHotel, { headers: headersToken})
  }

  AgregarHoteles(modeloHoteles: Hoteles, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloHoteles)
    return this._http.post(this.url + '/agregarHotel', parametros, {headers:headersToken})
  }

  EditarHoteles(modeloHoteles: Hoteles, token, idSucursal): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloHoteles)
    return this._http.put(this.url + '/editarHotel/' + idSucursal, parametros, {headers:headersToken})
  }

  EliminarHotel(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + '/eliminarHotel/' + id, { headers: headersToken })
  }


}
