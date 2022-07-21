import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes.model';


@Injectable({
  providedIn: 'root'
})

export class EmpresasService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')


  constructor(public _http: HttpClient) { }

  ObtenerUsuarios():Observable<any>{
    return this._http.get(this.url+'/empresas', {headers: this.headersVariable})
  }


  RegistrarEmpresas(modeloEmpresa: Clientes, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    let parametros = JSON.stringify(modeloEmpresa)
    return this._http.post(this.url + '/agregarCliente', parametros, {headers:headersToken})
  }

  
  EliminarUsuarios(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.delete(this.url + '/eliminarUsuario/' + id, { headers: headersToken })
  }
  
  ObtenerUsuariosId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/usuariosId/' + id, {headers: headersToken})
  }

  EditarUsuarios(modeloUsuario: Clientes, token): Observable<any> {
    let parametros = JSON.stringify(modeloUsuario);
    let headersToken = this.headersVariable.set('Authorization', token);
    console.log(modeloUsuario._id)
    return this._http.put(this.url + '/editarUsuario/' + modeloUsuario._id, parametros, { headers: headersToken })
  }
}
