import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public identidad;
  public token

  constructor(public _http: HttpClient) { }

  login(usuario, obtenerToken = null): Observable<any> {
    
    if(obtenerToken != null){
      usuario.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login', params, {headers: this.headersVariable});
  }

  ObtenerUsuarioLogueado(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/usuarioLogueado' +  { headers: headersToken })
  }

  
  obtenerToken(){

    this.ObtenerUsuarioLogueado(this.token)

    var token2 = localStorage.getItem("token");
    if(token2 != undefined){
      this.token = token2;
    } else {
      this.token = '';
    }

    return this.token;
  }

  obtenerIdentidad(){


    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }

  agregarUsuario(modeloUsuario: Clientes): Observable<any> {
    let parametros = JSON.stringify(modeloUsuario);

    return this._http.post(this.url + '/registrarUsuario', parametros, {headers: this.headersVariable})
  }


  
}
