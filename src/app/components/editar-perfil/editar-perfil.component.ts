import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Clientes } from 'src/app/models/clientes.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HotelesService } from 'src/app/services/hoteles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
    providers: [  UsuarioService, HotelesService, EmpresasService]

})
export class EditarPerfilComponent implements OnInit {

  public token
  public identidad;
  public empresaModelId: Clientes;



  constructor(
    public _activatedRoute: ActivatedRoute,
    public _usuarioService: UsuarioService,
    private _empresasService: EmpresasService,
    private _router: Router,

     private userRest: UsuarioService) {

  //this.productoModelGet = new Productos('','','',0,0,'');

  this.empresaModelId = new Clientes('','','','','','','','','','');
  this.token = this._usuarioService.obtenerToken();
  this.identidad = this._usuarioService.obtenerIdentidad();


   }

   public idEmpresa;

  ngOnInit(): void {
    this.getUserId(this.identidad._id)
    
  }


  putUser() {
    this._empresasService.EditarUsuarios(this.empresaModelId, this.token).subscribe(
      (response) => {
        localStorage.setItem("identidad", JSON.stringify(response.usuario))

        
        //console.log("Conversion 1-"+ response.usuario)
        //console.log("Conversion -"+ this._usuarioService.obtenerIdentidad())

        Swal.fire({
          icon: 'success',
          text: 'Datos editados con éxito',
        })

        this.getUserId(this.idEmpresa)
        this.identidad = this._usuarioService.obtenerIdentidad();
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


  deleteUser() {
    Swal.fire({
     title: '¿Está seguro que desea eliminar su cuenta?',
     text: "Este usuario será eliminado permanentemente",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: '¡Si, estoy seguro!'
   }).then((result) => {
     if (result.isConfirmed) {
       this._empresasService.EliminarUsuarios(this.identidad._id, this.token).subscribe(
         (response)=>{

           Swal.fire(
             '¡Eliminado!',
             'El usuario fue eliminado con éxito',
             'success'
           )
           localStorage.clear()
           this._router.navigate(['/inicio']);
         },
         (error)=>{
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: error.error.message,
           })
   
         }
       )
       
     }
   })
   
 }

 logOut(){
  localStorage.clear()
}




 
}
