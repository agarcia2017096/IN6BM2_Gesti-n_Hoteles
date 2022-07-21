import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProducto'
})
export class SearchProductoPipe implements PipeTransform {

  transform(productos:any, search:any) {
    if(search == undefined){
      return productos;
    }else{
      return productos.filter( producto => {

        
        return producto.NombreProducto.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}
