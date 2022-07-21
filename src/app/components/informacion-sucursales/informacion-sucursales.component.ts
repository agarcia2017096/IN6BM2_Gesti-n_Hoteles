import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Clientes } from "src/app/models/clientes.model";
import { Producto } from "src/app/models/producto.model";
import { ProductoSucursal } from "src/app/models/productoSucursal.model";
import { EmpresasService } from "src/app/services/empresas.service";
import { ProductosSucursalService } from "src/app/services/productos-sucursal.service";
import { HotelesService } from "src/app/services/hoteles.service";
import { UsuarioService } from "src/app/services/usuario.service";
import Swal from "sweetalert2";
import { Chart } from "chart.js";
import {InformacionHotelService} from "src/app/services/informacion-Hotel.service";
import { Habitaciones } from "src/app/models/habitaciones.model";
import { Eventos } from "src/app/models/eventos.model";
import { Servicios } from "src/app/models/servicios.model";
import { Hoteles } from "src/app/models/hoteles.model";
import { ReservacionService } from "src/app/services/reservaciones.service";
import { Reservacion } from "src/app/models/reservacion.model";
import { ReportesService } from "src/app/services/reportes.service";
import { Reporte } from "src/app/models/reporte.model";

@Component({
  selector: "app-informacion-sucursales",
  templateUrl: "./informacion-sucursales.component.html",
  styleUrls: ["./informacion-sucursales.component.scss"],
  providers: [
    UsuarioService,
    HotelesService,
    ProductosSucursalService,
    EmpresasService,
    ReservacionService,
    ReportesService
  ],
})

export class InformacionSucursalesComponent implements OnInit {
  
  public serchReservacion;
  public dispo = true;
  public token;
  public identidad;
  public HabitacionesModelGet: Habitaciones;
  public HabitacionesModelGetId: Habitaciones;
  public HabitacionesModelPost: Habitaciones;
  public EventosModelGet: Eventos;
  public EventosModelGetId: Eventos;
  public EventosModelPost: Eventos;
  public ServiciosModelGet: Servicios;
  public ServiciosModelGetId: Servicios;
  public ServiciosModelPost: Servicios;
  public ServiciosModelPostRegistro: Servicios;
  public EventosModelPostRegistro: Eventos;
  public hotelModelId: Hoteles ;
  public ReservacionesModelGet: Reservacion;


  public imagenesDinamicas = [
    { url: 'habitacion1.web' },
    { url: 'habitacion2.jpg' },
    { url: 'habitacion3.jpg' },
    { url: 'habitacion4.jpg' },
    { url: 'habitacion5.jpg' },
    { url: 'habitacion6.jpg' },
    { url: 'habitacion7.jpg' },
    { url: 'habitacion8.jpg' },
    { url: 'habitacion9.jpg' },
    
  ]

  public random = Math.floor(Math.random()*this.imagenesDinamicas.length)
  
  //REPORTES 
  public reportesModelGet: Reporte ;
  
    //Reservacion
    public idHabitacion
    public reservacionModelGet: Reservacion;
    public reservacionlModelPost: Reservacion;
    public reservacionModelGetId: Reservacion;

  constructor(
    private _informacion: InformacionHotelService,
    public _activatedRoute: ActivatedRoute,
    public _usuarioService: UsuarioService,
    private _hotelService: HotelesService,
    private _reservacionService: ReservacionService,
    private _reportesService: ReportesService,


  ) {

    this.HabitacionesModelGet = new Habitaciones('', '', '', '', 0, '' ,'', 0);
    this.ReservacionesModelGet = new Reservacion('', '', '', '', '' , 0);
    this.reportesModelGet = new Reporte('','','','','',0)
    this.HabitacionesModelGetId = new Habitaciones('', '', '', '', 0, '' , '',0);
    this.HabitacionesModelPost = new Habitaciones('', '', '', '', 0, '' , '', 0);
    this.EventosModelGet = new Eventos('', '', '', 0, '', '', '', '');
    this.EventosModelGetId = new Eventos('', '', '', 0, '', '', '', '');
    this.EventosModelPost = new Eventos('', '', '', 0, '', '', '', '');
    this.ServiciosModelGet = new Servicios('', '', '', 0, '', '');
    this.ServiciosModelGetId = new Servicios('', '', '', 0, '', '');
    this.ServiciosModelPost = new Servicios('', '', '', 0, '', '');
    this.ServiciosModelPostRegistro = new Servicios('', '', '', 0, '', this.idHotel);
    this.EventosModelPostRegistro = new Eventos('', '', '', 0, '', '', '', this.idHotel);


    this.hotelModelId = new Hoteles('','','','','','',0)
    this.token = this._usuarioService.obtenerToken();
    this.identidad = this._usuarioService.obtenerIdentidad();
    this.reservacionlModelPost = new Reservacion('', this.idHotel, '', '', '', 0);

  }

  public idEmpresa;
  public idHotel;
  public cantidadDisponibles

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      //console.log("RAMPOM "+this.random)

      this.idEmpresa = this._usuarioService.obtenerIdentidad();
      ////console.log('ID DE LA EMPRESA'+ this.idEmpresa._id

      this.idHotel = dataRuta.get("idHotel");
      this.reservacionlModelPost = new Reservacion('', this.idHotel, '', '', '', 0)
      this.ServiciosModelPostRegistro = new Servicios('', '', '', 0, "", this.idHotel)
      this.EventosModelPostRegistro = new Eventos('', '', '', 0, '', '', '', this.idHotel);

      this.getHotel();
      this.getServicios();
      this.getHabitaciones();
      this.getEventos();
      this.getReporte()
      
      
    });
  }
  refresh(): void { window.location.reload(); }

  getHotel(){
    this._hotelService.ObtenerHotelesId(this.idHotel, this.token).subscribe({
      next: (response: any) => {
        this.hotelModelId = response.Hoteles;
        //console.log(this.hotelModelId);
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {

      }
    });
  }

  
  getReporte(){
    this._reportesService.obtenerReportes(this.idHotel, this.token).subscribe({
      next: (response: any) => {
        this.reportesModelGet = response.reportes;
        /*if( response.reportes.length == 0||){
          Swal.fire({
            icon: "info",
            title: "Información",
            text: "Actualmente no existen reservaciones",
            footer: "Ningún usuario a reservado habitaciones"
  
          });
        }*/
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {

      }
    });
  }


  getHabitaciones(){
    this._informacion.ObtenerHabitaciones(this.idHotel,this.token).subscribe({
      next: (response: any) => {
        this.HabitacionesModelGet = response.Habitaciones;
        this.cantidadDisponibles = response.Habitaciones.length;
        //console.log(this.HabitacionesModelGet);
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {

      }
    });
  }

  getHabitacionesId(id){
    this._informacion.ObtenerHabitacionesId(id).subscribe({
      next: (response: any) => {
        this.HabitacionesModelGetId = response.Habitacion;
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {

      }
    });
  }

  getServicios(){
    this._informacion.ObtenerServicios(this.idHotel,this.token).subscribe({
      next: (response: any) => {
        this.ServiciosModelGet = response.Servicios;
        //console.log(this.ServiciosModelGet);
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {

      }
    });
  }

  getServicioId(id){
    this._informacion.ObtenerServiciosId(id, this.token).subscribe({
      next: (response: any) => {
        this.ServiciosModelGetId = response.Hoteles;
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {

      }
    });
  }

  getEventos(){
    this._informacion.ObtenerEventos(this.idHotel,this.token).subscribe({
      next: (response: any) => {
        this.EventosModelGet = response.eventos;
        //console.log(this.EventosModelGet);
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {

      }
    });
  }

  getEventosId(id){
    this._informacion.ObtenerEventosId(id).subscribe({
      next: (response: any) => {
        this.EventosModelGetId = response.evento;
      },
      error: (err) => {
        //console.log(err)
      },
      complete: () => {

      }
    });
  }

  postHabitaciones(addHabitacionForm){
    this._informacion.registrarHabitaciones(this.idHotel, this.HabitacionesModelPost, this.token).subscribe({
      next: (response: any) => {
        this.getHabitaciones();
        addHabitacionForm.reset();
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

  postEventos(addProductForm){
    this._informacion.registrarEventos(this.idHotel, this.EventosModelPost, this.token).subscribe({
      next: (response: any) => {
        this.getEventos();
        addProductForm.reset();
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

  postServicios(addServiceForm){
    this._informacion.registrarServicios(this.idHotel, this.ServiciosModelPost, this.token).subscribe({
      next: (response: any) => {
        this.getServicios();
        //console.log(response)
        addServiceForm.reset();
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

  putServicios(addHabitacionForm){
    this._informacion.editarServicio(this.ServiciosModelGetId._id, this.ServiciosModelGetId, this.token).subscribe({
      next: (response: any) => {
        this.refresh();
        addHabitacionForm.reset();
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

  putEventos(addProductForm){
    this._informacion.editarEvento(this.EventosModelGetId._id, this.EventosModelGetId, this.token).subscribe({
      next: (response: any) => {
        this.getEventos();
        addProductForm.reset();
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

  putHabitaciones(addProductForm){
    this._informacion.editarHabitacion(this.HabitacionesModelGetId._id, this.HabitacionesModelGetId, this.token).subscribe({
      next: (response: any) => {
        this.getHabitaciones();
        addProductForm.reset();
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

  deleteServicio(id){
    Swal.fire({
      title: "¿Está seguro?",
      text: "Si elimina este servicio, no lo podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar.",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this._informacion.eliminarServicio(id, this.token).subscribe({
      next: (response: any) => {
        Swal.fire("Eliminada", "El servicio se elimino correctamente", "success");
        this.getServicios();
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

  deleteEvento(id){
    Swal.fire({
      title: "¿Está seguro?",
      text: "Si elimina este evento, no lo podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar.",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this._informacion.eliminarEvento(id, this.token).subscribe({
      next: (response: any) => {
        Swal.fire("Eliminada", "El evento se elimino correctamente", "success");
        this.getEventos();
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


  deleteHabitacion(id){
    Swal.fire({
      title: "¿Está seguro?",
      text: "Si elimina esta habitaión, no la podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar.",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this._informacion.eliminarHabitacion(id, this.token).subscribe({
      next: (response: any) => {
        Swal.fire("Eliminada", "La habitaión se elimino correctamente", "success");
        this.getHabitaciones();
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
  
  //  RESERVA - FUNTIONS FOR
  getReserva() {
    this._reservacionService.obtenerRervaciones(this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.reservacionModelGet = response.reservaciones;
        //console.log(response);
        //console.log(this.reservacionModelGet);
      },
      (error) => {
        //console.log(<any>error)
      }
    )
  }

  getReservaId(idReservacion) {
    this._reservacionService.obtenerRervacionId(idReservacion, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.reservacionModelGetId = response.reservaciones;
        //console.log(response);
        //console.log(this.reservacionModelGetId);
      },
      (error) => {
        //console.log(<any>error)
      }
    )
  }

  postReserva(addForm, idHabitacion) {
    this._reservacionService.agregarReservacion(this.HabitacionesModelGetId._id, this.reservacionlModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        //console.log(response);
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha realizado la Reservación Correctamente',
          text: '¡Bienvenido a nuestro Gran Hotel!',
          footer: 'Nos alegra tu próxima Visita.'
        })
        this.getHabitaciones()
      },
      (error) => {
        //console.log(<any>error);

        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: 'No dejes campos vacios, ¡gracias!'
        })
      }
    )
  }

  //RESERVAR EVENTOS
  
  postEvento(addForm) {
    this._informacion.comprarEvento(this.EventosModelGetId._id, this.EventosModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        //console.log(response);
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha realizado la confirmación correctamente',
          text: '¡Bienvenido a nuestro Gran Hotel!',
          footer: 'Esperamos que sea de su agrado.'
        })
        this.getEventos()
      },
      (error) => {
        //console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información esté correcta!',
          footer: 'No dejes campos vacios, ¡gracias!'
        })
      }
    )
  }

  //COMPRAR SERVICIO
  
  postServicio(addForm) {
    this._informacion.comprarServicio(this.ServiciosModelGetId._id, this.ServiciosModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        if(response.message){
          Swal.fire({
            icon: 'success',
            title: 'Se ha actualizado la confirmación correctamente',
            text: '¡Bienvenido a nuestro Gran Hotel!',
            footer: 'Esperamos que sea de su agrado. '
          })
        }
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha realizado la confirmación correctamente',
          text: '¡Bienvenido a nuestro Gran Hotel!',
          footer: 'Esperamos que sea de su agrado. '
        })
        this.getServicios()
      },
      (error) => {
        //console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: error.error.message,
          text: '¡Revisa que la información esté correcta!',
          footer: "ATT: TRAVEL INC"
        })
      }
    )
  }
} 
