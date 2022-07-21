import { Component, OnInit } from '@angular/core';
import {  Hoteles } from 'src/app/models/hoteles.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';  
import { HotelesService } from 'src/app/services/hoteles.service';
import { ActivatedRoute } from '@angular/router';
import { ReportesService } from 'src/app/services/reportes.service';
import { Reporte } from 'src/app/models/reporte.model';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
  providers: [HotelesService, UsuarioService,ReportesService ]
})

export class EmpresasComponent implements OnInit {
  public token;
  public identidad;

  public coloresDinamicos = ['red','yellow','blue','green','orange',"skyblue",'red','yellow','blue','green','orange',"skyblue"]
  public imagenesDinamicas = [
    { url: 'iconCard2.jpg' },
    { url: 'iconCard1.jpg' },
    
  ]

  public random = Math.floor(Math.random()*this.coloresDinamicos.length)

  public hotelesGraficaModelGet: any = [];


  // GRAFICA REPORTE DE VENTAS
  chartOptions = {
    responsive: true,
  };
  //Nombres productos
  chartLabels: any = [];
  //cantidad de producto
  chartData: any = [];
  chartColors: any = [
    {
      backgroundColor: [],
    },
  ];
  chartLegend = true;
  chartPlugins = [];

  //REPORTES 
  public reportesModelGet: Reporte ;

  //HOTELES
  public hotelesModelGet: Hoteles ;
  public hotelModelId: Hoteles ;
  public hotelModelIdEdit: Hoteles;

  public hotelesModelPost: Hoteles ;


  constructor(
    public _activatedRoute: ActivatedRoute,
     private _reportesService: ReportesService,
     private _hotelesService: HotelesService,
      public _usuarioService: UsuarioService)
    {
    this.hotelesModelPost = new Hoteles('','','','','','',0)
    this.hotelModelId = new Hoteles('','','','','','',0)
    this.hotelModelIdEdit = new Hoteles("", "", "", "", "",'',0);



    this.token = this._usuarioService.obtenerToken()
    this.identidad = this._usuarioService.obtenerIdentidad();

  }

  public idHotel;
  public id;  
  public search;


  ngOnInit(): void {
    ////console.log(this.identidad)
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{

      ////console.log(dataRuta.get('idHotel'));
      this.idHotel = dataRuta.get('idHotel')

      this.id = dataRuta.get('id')
      this.getHotelesId('id')

      ////console.log("RAMPOM "+this.random)
      if(this.identidad.rol=='ROL_ADMINISTRADOR'){
        this.getHoteles ()
      }else{
        this.getHotelesUser ()

      }
      ////console.log("IMAGENES"+this.imagenesDinamicas)

      this.imagenesDinamicas.forEach(element => {
        ////console.log("IMAGENES "+element)

      });

    })
  }

  getHotelesId(idhotel) {
    this._hotelesService.ObtenerHotelesId(idhotel,this.token).subscribe({

      next: (response: any)=> {  // 200

        this.hotelModelIdEdit = response.Hoteles
        ////console.log(response.hotel)
        ////console.log(this.hotelModelIdEdit)
      },
      error: (err) => { //400 404 500 401 403

      },
      complete: ()=>{

      }})
  }

  getHoteles (){
    //console.log("idHotel "+ this.idHotel)
    ////console.log('el id de la empresa es:' + this.idHotel)
      this._hotelesService.ObtenerHoteles (this.token).subscribe(
        (response) => {
          this.hotelesModelGet = response.Hoteles;
          this.hotelesGraficaModelGet =response.Hoteles;
                    ////console.log(this.sucursalesModelGet);
          this._activatedRoute.paramMap.subscribe((dataRuta) => {
            ////console.log(" ARRAY" + this.sucursalesModelGet);
            this.hotelesGraficaModelGet.forEach((element) => {
              ////console.log(element);
            });

            this.getSucursalesGrafica();
          });
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

    
  getHotelesUser (){
    //console.log("idHotel "+ this.idHotel)
    ////console.log('el id de la empresa es:' + this.idHotel)
      this._hotelesService.ObtenerHotelesUser (this.token).subscribe(
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

    postHotel(agregarHotel){
      this._hotelesService.AgregarHoteles(this.hotelesModelPost, this.token).subscribe(
        (response)=>{
          ////console.log(response);
          this.getHoteles()
          agregarHotel.reset()
          this.chartOptions = {
            responsive: true,
          };
          //Nombres productos
          this.chartLabels = [];
          //cantidad de producto
          this.chartData = [];
          this.chartColors = [
            {
              backgroundColor: [],
            },
          ];
          this.chartLegend = true;
          this.chartPlugins = [];

          this._activatedRoute.paramMap.subscribe((dataRuta) => {

            ////console.log(" ARRAY" + this.sucursalesModelGet);
            this.hotelesGraficaModelGet.forEach((element) => {
              ////console.log(element);
            });
          });

          Swal.fire(
            'Se agrego correctamente su hotel!',
            '',
            'success'
          )
       },
       (error)=>{
          ////console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            footer: 'Ingrese los datos de nuevo'
          })
       }
      )
    }

    putHoteles(idhotel) {
      this._hotelesService.EditarHoteles(this.hotelModelIdEdit, this._usuarioService.obtenerToken(), idhotel).subscribe({
        
        next: (response: any)=> {  // 200
          
          this.getHoteles();
          this.chartOptions = {
            responsive: true,
          };
          //Nombres productos
          this.chartLabels = [];
          //cantidad de producto
          this.chartData = [];
          this.chartColors = [
            {
              backgroundColor: [],
            },
          ];
          this.chartLegend = true;
          this.chartPlugins = [];

          this._activatedRoute.paramMap.subscribe((dataRuta) => {

            ////console.log(" ARRAY" + this.sucursalesModelGet);
            this.hotelesGraficaModelGet.forEach((element) => {
              ////console.log(element);
            });
          });


        },
        error: (err) => { //400 404 500 401 403
          Swal.fire({
            icon: "error",
            title: err.error.message,
            footer: "Ingrese los datos de nuevo",
          });
          ////console.log(err);
        },
        complete: ()=>{
  
        }})
    }

    deleteHoteles(idhotel){
      //console.log(idhotel);
      Swal.fire({
        title: '¿Está seguro que desea eliminar la hotel?',
        text: "Será eliminada permanentemente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
          this._hotelesService.EliminarHotel(idhotel, this.token = this._usuarioService.obtenerToken()).subscribe(
            (response)=>{
              ////console.log(response);
              this.getHoteles();
              Swal.fire(
                '¡Eliminación completada!',
                'El dato fue eliminado exitosamente',
                'success'
              )
              this.chartOptions = {
                responsive: true,
              };
              //Nombres productos
              this.chartLabels = [];
              //cantidad de producto
              this.chartData = [];
              this.chartColors = [
                {
                  backgroundColor: [],
                },
              ];
              this.chartLegend = true;
              this.chartPlugins = [];

              this._activatedRoute.paramMap.subscribe((dataRuta) => {

                ////console.log(" ARRAY" + this.sucursalesModelGet);
                this.hotelesGraficaModelGet.forEach((element) => {
                  ////console.log(element);
                });
              });


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

    getHotelId(idhotel){
      this._hotelesService.ObtenerHotelesId(idhotel, this.token).subscribe(
        (response) => {
          this.hotelModelId = response.Hoteles;
          ////console.log(response);
          ////console.log(this.hotelModelId);
        },
        (error)=>{
          ////console.log(<any>error)
        }
      )
    }

    logOut(){
      localStorage.clear()
      //localStorage.removeItem("token")
    }

  
    getSucursalesGrafica() {
      this._hotelesService
        .ObtenerHoteles( this.token)
        .subscribe(
          (response) => {
  
            this.hotelesGraficaModelGet.forEach((dato) => {
              this.chartLabels.push(dato.nombreHotel);
              this.chartData.push(dato.cantidadReservaciones);
             
             
              ////console.log(this.chartData1)
              this.chartColors[0].backgroundColor.push(
                `#${Math.floor(Math.random() * 16777215).toString(16)}`
              );
  
              //
            });
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.error.message,
            });
          }
        );
    }
}

