import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(clientes: any, searchUser: any): unknown {
    if(searchUser == undefined){
      return clientes;
    } else {
      return clientes.filter((cliente=>{
        return JSON.stringify(cliente).toLowerCase().includes(searchUser.toLowerCase());
      }))
    }
  }

}
