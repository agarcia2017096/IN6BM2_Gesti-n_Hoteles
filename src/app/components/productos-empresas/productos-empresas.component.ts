import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Clientes } from 'src/app/models/clientes.model';
import { HotelesService } from 'src/app/services/hoteles.service';
import { Hoteles } from 'src/app/models/hoteles.model';
import { ProductoSucursal } from 'src/app/models/productoSucursal.model';
import { ProductosSucursalService } from 'src/app/services/productos-sucursal.service';
import { RegistroService } from 'src/app/services/regitro.service';
import { Registro } from 'src/app/models/registro.model';

@Component({
  selector: 'app-productos-empresas',
  templateUrl: './productos-empresas.component.html',
  styleUrls: ['./productos-empresas.component.scss'],
  providers: [ ProductosService, UsuarioService, HotelesService,ProductosSucursalService,EmpresasService,RegistroService]
})
export class ProductosEmpresasComponent implements OnInit {

  public search;



  public productoSucursalesModel: ProductoSucursal;

 public searchProducto
  public token
  public identidad;
  public RegistroModelGet: Registro;
  public precioTotal: Number = 0;
  public precioTotal5: Number = 0;


  constructor(
    public _activatedRoute: ActivatedRoute,
    public _usuarioService: UsuarioService,
    public _registroService: RegistroService,) {

  this.RegistroModelGet = new Registro('','',0,0,'',0,"");
  this.token = this._usuarioService.obtenerToken();
  this.identidad = this._usuarioService.obtenerIdentidad();

   }

   public idEmpresa;
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{

    })
    if( this.identidad.rol=="ROL_CLIENTE"){
      this.getRegistro();

    }else{
      this.getRegistroHotel();

    }
  }
  refresh(): void { window.location.reload(); }

  getRegistro(){
    this._registroService.ObtenerRegistro(this.token).subscribe({
      next: (response: any) => {
        this.RegistroModelGet = response.Registro;
        this.total(this.RegistroModelGet)
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {

      }
    });
  }

  
  getRegistroHotel(){
    this._registroService.ObtenerRegistroHotel(this.identidad.idHotel,this.token).subscribe({
      next: (response: any) => {
        this.RegistroModelGet = response.Registro;
        this.total(this.RegistroModelGet)
        if( response.Registro.length == 0){
          Swal.fire({
            icon: "info",
            title: "Información",
            text: "Actualmente no existen reservaciones",
            footer: "Ningún usuario a reservado habitaciones"
  
          });
        }
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {

      }
    });
  }

  total(precios){
    for(let i=0; i<precios.length; i++){
      this.precioTotal = this.precioTotal + precios[i].subTotal;
    }
    this.precioTotal5 = Number(this.precioTotal) * 105 /100; 
  }

  deleteRegistro(nombre){
    Swal.fire({
      title: "¿Está seguro?",
      text: "Si elimina esto, no lo podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar.",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this._registroService.EliminarRegistro(nombre, this.token).subscribe({
      next: (response: any) => {
        Swal.fire("Eliminada", "Se elimino correctamente", "success");
        this.refresh();
      },
      error: (err) => {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        });
      },
      complete: () => {

      }
    });
        
      }
    });
  }
  clicPagado(){
    if( this.identidad.rol=="ROL_CLIENTE"){
      Swal.fire({
        icon: 'success',
        title: 'Se ha confirmado y procesado su cuenta (factura)',
        text: '¡Siga disfrutando la experiencia en el hotel!',
        footer: 'Gracias por preferir TRAVEL INC'
      })
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Se ha confirmado que los ingresos son correctos',
        text: '¡Trabajo Bien Hecho!',
        footer: 'Gracias por ser parte del equipo de trabajo de TRAVEL INC'
      })
    }

  }
}


