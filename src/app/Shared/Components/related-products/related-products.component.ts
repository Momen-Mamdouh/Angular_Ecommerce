import { Component, inject, input, InputSignal, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../Interfaces/iproduct';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { SearchPipe } from './../../Pipes/searchPipe/search.pipe';
import { CartApiService } from '../../../Core/Services/cartApi/cart-api.service';
import { environment } from '../../../Core/Environments/Environment';
import { Subscription } from 'rxjs';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICart } from '../../Interfaces/icart';

@Component({
  selector: 'app-related-products',
  imports: [RouterLink, CurrencyPipe, SearchPipe],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss'
})
export class RelatedProductsComponent implements OnInit, OnDestroy {


  private readonly cartApiService:CartApiService = inject(CartApiService);
  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly platformId:Object = inject(PLATFORM_ID);
  private readonly ngxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService);

  
  cartDataSubscription!:Subscription;
  loggedUserAllDataSubscription!:Subscription;

  searchItem!:string;
  bodyData!:Object;
  cartData!:ICart;

  filteredProducts:InputSignal<IProduct[]> = input<IProduct[]>([] as IProduct[]);

  constructor(){
    this.searchItem = ``;
    this.bodyData = {} ; 
    this.cartData = {} as ICart;
  }

  ngOnInit(): void {
    this.getLoggedUserCartData();
  }

  ngOnDestroy(): void {
    this.cartDataSubscription?.unsubscribe();
    this.loggedUserAllDataSubscription?.unsubscribe();
  }

  getLoggedUserCartData(){
    // ^^To get All Cart Products Data to display from it numberofCartItems 
    // ^^and Products we already have so at deailng with cart we upload data
    this.ngxSpinnerService.show()
    this.loggedUserAllDataSubscription = this.apiDataService.getAllData(environment.getDataFromCart).subscribe({
      next:(response)=>{
        this.cartData = response.data;
        this.cartApiService.numberOfCartItems.set(response.numOfCartItems); 
        this.cartApiService.productsAddedData.set(response.data.products);
        this.ngxSpinnerService.hide()  ;      
      },

    }) 
  };

 addToCart(productId:string){
     this.bodyData = {
       "productId": productId,
     };
     if(isPlatformBrowser(this.platformId)){
       this.ngxSpinnerService.show();
       this.cartDataSubscription = this.apiDataService.postData(environment.addProductToCart, this.bodyData).subscribe({
         next: (response)=>{
           
             this.cartApiService.productsAddedData.set(response.data.products);
             this.cartApiService.numberOfCartItems.set(response.numOfCartItems);         
             this.getLoggedUserCartData();              
         },
         error:(error)=>{
           this.ngxSpinnerService.hide();
         }
       })
     }
    
  }

}
