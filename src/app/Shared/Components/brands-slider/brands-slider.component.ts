import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { environment } from '../../../Core/Environments/Environment';
import { IBrands } from '../../Interfaces/ibrands';
import { Subscription } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-brands-slider',
  imports: [],
  templateUrl: './brands-slider.component.html',
  styleUrl: './brands-slider.component.scss',
   schemas : [CUSTOM_ELEMENTS_SCHEMA],
   animations: [
    trigger('fadeIn', [
      transition(':enter', [ // when the element enters the DOM
        style({ opacity: 0 }),
        animate('2000ms ease-in-out', style({ opacity: 1 }))
      ]),
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])]),
    
  ]
})
export class BrandsSliderComponent {

  private readonly apiDataService:ApiDataService = inject(ApiDataService);

  getBrandsDataSubscription!:Subscription;

  isLoaded!:boolean;
  brandsData!:IBrands[];


  constructor(){
    
      this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getAllBrands();
    
  }
  ngOnDestroy(): void {
    this.getBrandsDataSubscription?.unsubscribe();
  }

  getAllBrands():void{
      
     this.getBrandsDataSubscription =  this.apiDataService.getAllData(environment.brandsEndPoint).subscribe({
        next:(response)=>{
              this.isLoaded = true;
              this.brandsData = response.data;
        }, 
        error:(error)=>{
          console.log(error);
          
        }
      })
  }

}
