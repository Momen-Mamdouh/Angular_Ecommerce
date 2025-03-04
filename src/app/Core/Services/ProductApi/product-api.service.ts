import { inject, Injectable, PLATFORM_ID, signal, WritableSignal, OnInit, OnDestroy } from '@angular/core';
import { ApiDataService } from '../Api/api-data.service';
import { IProduct } from '../../../Shared/Interfaces/iproduct';
import { environment } from '../../Environments/Environment';
import { Subscribable, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService implements OnInit, OnDestroy{

  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly platformId:Object = inject(PLATFORM_ID);
  private readonly ngxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService);

  getAllProducts!:Subscription;

  filteredProductsShared!:WritableSignal<IProduct[]>;
  products!:IProduct[]

  constructor() {
    this.filteredProductsShared = signal([] as IProduct[]);

   };

   ngOnInit(): void {
  
    
   }
   ngOnDestroy(): void {
      this.getAllProducts?.unsubscribe();
   }

   getRelatedProductsData(relatedData:string){
    if(isPlatformBrowser(this.platformId)){ 
      this.ngxSpinnerService.show(); 

      this.getAllProducts = this.apiDataService.getAllData(environment.specficProductEndPoint).subscribe({
        next: (response)=>{
            this.products = response.data;  
            this.filteredProductsShared.set(this.products.filter((product) => product.category.name === relatedData))                              
        },

        error:()=>{
          this.ngxSpinnerService.hide() 
        },
        complete:()=>{
          this.ngxSpinnerService.hide() 
        }
      });
    }
  };


   
}
