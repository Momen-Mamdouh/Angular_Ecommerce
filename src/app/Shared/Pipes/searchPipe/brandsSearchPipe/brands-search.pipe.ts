import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brandsSearch'
})
export class BrandsSearchPipe implements PipeTransform {

  transform(myArray: any[] , searchText:string) {
    return myArray.filter((item)=>item.name.toUpperCase().includes(searchText.toUpperCase()));
  }

}
