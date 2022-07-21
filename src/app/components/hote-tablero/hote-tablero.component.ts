import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hoteles } from 'src/app/models/hoteles.model';
import { HotelesService } from 'src/app/services/hoteles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hote-tablero',
  templateUrl: './hote-tablero.component.html',
  styleUrls: ['./hote-tablero.component.scss'],
  providers: [HotelesService]

})
export class HoteTableroComponent implements OnInit {

  public coloresDinamicos = ['red','yellow','blue','green','orange',"skyblue",'red','yellow','blue','green','orange',"skyblue"]
 public search
  
  //HOTELES
  public hotelesModelGet: Hoteles ;
  
  constructor(     private _hotelesService: HotelesService,
    private _router: Router

    ) { }

  ngOnInit(): void {
    this.getHoteles()
  }

  
  getHoteles (){
    //console.log('el id de la empresa es:' + this.idHotel)
      this._hotelesService.ObtenerTableroHoteles ().subscribe(
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
          console.log(<any>error)

        }
     )
    
    }

    
    informacionHoteles(){
      Swal.fire({
        title: '¿Desea iniciar sesión en \n Travel INC?',
        text: "Para ver la información del hotel debe iniciar sesión",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
          this._router.navigate(['/login']);

          
        }
      })
    }


}
