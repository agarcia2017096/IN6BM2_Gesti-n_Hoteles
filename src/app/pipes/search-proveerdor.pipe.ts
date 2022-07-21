import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProveerdor'
})
export class SearchProveerdorPipe implements PipeTransform {

  transform(productos:any, search:any) {
    if(search == undefined){
      return productos;
    }else{
      return productos.filter( producto => {
        return producto.NombreProveedor.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}
