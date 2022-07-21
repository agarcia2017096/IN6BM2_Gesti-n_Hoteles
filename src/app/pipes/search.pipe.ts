import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(hoteles: any, search: any) {
    if(search == undefined){
      return hoteles;
    }else{
      return hoteles.filter(hotel => {
        //return product.nombre.toLowerCase().includes(search.toLowerCase()) || product.cantidad.toLowerCase().includes(search.toLowerCase);
        return JSON.stringify(hotel).toLowerCase().includes(search.toLowerCase());

      })
    }
  }

}
 