import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any, filter: any) {
    if(filter == undefined){
      return products;
    }else{
      return products.sort((a, b) => {
        if (a[filter] < b[filter]) {
          return -1;
        } else if (a[filter] === b[filter]) {
          return 0;
        } else if (a[filter] > b[filter]) {
          return 1;
        }
        // if(a[propName] > b[propName]) return 1
        // else return 1;
      });
    }
  }

}
