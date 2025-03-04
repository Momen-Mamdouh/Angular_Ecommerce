import { Component, inject } from '@angular/core';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  private readonly apiDataService:ApiDataService = inject(ApiDataService);





  logOut():void{
    this.apiDataService.logOut();
   }
}
