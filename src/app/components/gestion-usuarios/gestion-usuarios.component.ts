import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { ActivatedRoute } from "@angular/router";
import { UsuarioService } from 'src/app/services/usuario.service';
import { Clientes } from "src/app/models/clientes.model";
import Swal from 'sweetalert2';
import { HotelesService } from 'src/app/services/hoteles.service';
import { Hoteles } from 'src/app/models/hoteles.model';



@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss'],
  providers: [
    UsuarioService,
    EmpresasService,
    HotelesService
  ],
})

export class GestionUsuariosComponent implements OnInit {
  public token;
  public identidad;
  public searchUser;

  //HOTELES
  public hotelesModelGet: Hoteles ;

  //USUARIOS
  public empresasModelGet: Clientes;
  public empresasModelPost: Clientes;
  public empresaModelId: Clientes;
  public sucursalModelIdEdit: Clientes;

  public _activateRoute: ActivatedRoute
  constructor(private _empresasService: EmpresasService, public _usuarioService: UsuarioService, public _hotelesService: HotelesService) {
    this.empresasModelPost = new Clientes('', '', '', '', '', '','', '', '',"")
    this.empresaModelId = new Clientes('', '', '', '', '', '','', '', '', '');
    this.sucursalModelIdEdit = new Clientes("", "", "", "", "", "",'', '', '', '');
    this.token = this._usuarioService.obtenerToken();
    this.identidad = this._usuarioService.obtenerIdentidad();

  }
public id;

  ngOnInit(): void {
    this.getEmpresas();
    this.getHoteles();


  }

  getEmpresas() {
    this._empresasService.ObtenerUsuarios().subscribe(
      (response) => {
        //console.log(response)
        this.empresasModelGet = response.Empresas;
        ////console.log(response.Empresas);
        if (response.Empresas.length == 0) {
          Swal.fire({
            icon: "info",
            title: "Información",
            text: "Actualmente no existen usuarios",
            footer: "Debe registrar usuarios "

          });
        }
      },
      (error) => {
        ////console.log(<any>error)

      }
    )
  }


  putUser() {
    this._empresasService.EditarUsuarios(this.empresaModelId, this.token).subscribe(
      (response) => {
        ////console.log(response);
        this.getEmpresas();
        //console.log(response)
      },
      (error) => {
        //console.log(<any>error);

        ////console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          footer: 'Ingrese los datos de nuevo'
        })
      }
    )
  }

  getUserId(idUser) {
    this._empresasService.ObtenerUsuariosId(idUser, this.token).subscribe(
      (response) => {
        this.empresaModelId = response.empleadoEncontrado;
       
        ////console.log(response);
        ////console.log(this.empresaModelId);
      },
      (error) => {
        ////console.log(<any>error)
      }
    )
  }

  
  getHoteles (){
    ////console.log('el id de la empresa es:' + this.idHotel)
      this._hotelesService.ObtenerHoteles (this.token).subscribe(
        (response) => {
          this.hotelesModelGet = response.Hoteles;
          if(response.Hoteles.length == 0){
            Swal.fire({
              icon: "info",
              title: "Información",
              text: "Actualmente no existen Hoteles",
              footer: "El administrador puede gestionar los hoteles"
    
            });
          }
        },
        (error)=>{
          //console.log(<any>error)
          


        }
     )
    
    }


}
