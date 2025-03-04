import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(myArray: any[] , searchText:string) {
    return myArray.filter((item)=>item.title.toUpperCase().includes(searchText.toUpperCase()));
  }

}
