import { Component, computed, inject,  OnInit, PLATFORM_ID, signal, Signal } from '@angular/core';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { WishListService } from '../../../Core/Services/wishListApi/wish-list.service';
import { IProduct } from '../../Interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../Core/Environments/Environment';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { ICartProduct } from '../../Interfaces/icart';
import { CartApiService } from '../../../Core/Services/cartApi/cart-api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly wishList:WishListService = inject(WishListService);
  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly cartApiService:CartApiService = inject(CartApiService);
  private readonly ngxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService);
  private readonly platform_Id:Object = inject(PLATFORM_ID);

  cartDataSubscription!:Subscription;
  loggedUserAllDataSubscription!:Subscription;
  wishListDataSubscription!:Subscription;

  detailsId!:string;
  removeEndPoint!:string;
  productId!:Object;
  bodyData!:Object;

  wishListData!:Signal<IProduct[]>;
  cartProducts!:Signal<ICartProduct[]>;
  currentCount!:Signal<number>;;

  

  constructor(){
    this.detailsId = ``;
    this.removeEndPoint = ``;
    this.productId = {};
    this.bodyData = {};
    this.wishListData = computed(()=>this.wishList.wishListData());
    this.cartProducts = signal([] as ICartProduct[]);
    this.currentCount = signal(0);
  };
  
  ngOnInit(): void {
    if(isPlatformBrowser(this.platform_Id)){
        this.ngxSpinnerService.show();
        this.wishList.getLoggedUserWishList(); 
        this.cartProducts = computed(()=>this.cartApiService.productsAddedData());
        this.currentCount = computed(()=>this.cartApiService.detailedProductCount());
        this.ngxSpinnerService.hide();
    };
  };

  ngOnDestroy(): void {
    this.cartDataSubscription?.unsubscribe();
    this.loggedUserAllDataSubscription?.unsubscribe();
    this.wishListDataSubscription?.unsubscribe();
    
  }

  getLoggedUserCartData():void{
    this.ngxSpinnerService.show();
    this.loggedUserAllDataSubscription = this.apiDataService.getAllData(environment.getDataFromCart).subscribe({
      next:(response)=>{
        this.cartApiService.numberOfCartItems.set(response.numOfCartItems); 
        this.cartApiService.productsAddedData.set(response.data.products);
        this.getCureentProductCount();
        this.ngxSpinnerService.hide();         
      },

    }) 
  };

  getCureentProductCount():void{
    this.cartProducts().forEach((cartProduct)=>{
      if(this.detailsId == cartProduct.product.id){
        this.cartApiService.detailedProductCount.set(cartProduct.count);
        this.currentCount = computed(()=>this.cartApiService.detailedProductCount()); 
      };
    });
  }


  addToCart(productId:string){
      this.bodyData = {
        "productId": productId,
      };

      if(isPlatformBrowser(this.platform_Id)){
        this.ngxSpinnerService.show();
        this.cartDataSubscription = this.apiDataService.postData(environment.addProductToCart, this.bodyData ).subscribe({
          next: (response)=>{
              this.cartApiService.productsAddedData.set(response.data.products);
              this.cartApiService.numberOfCartItems.set(response.numOfCartItems);         
              this.getLoggedUserCartData(); 
              this.ngxSpinnerService.hide();             
          },
          error:(error)=>{
            this.ngxSpinnerService.hide(); 
          }
        })
      }
      
  };



  removeProductFromWishList(productId:string):void{
    this.ngxSpinnerService.show();
    this.removeEndPoint = environment.getUserWishList + productId;
    this.apiDataService.deleteData(this.removeEndPoint).subscribe({
      next:(response)=>{
          this.wishList.getLoggedUserWishList(); 
          this.wishList.numberOfWishListItems.set(response.data.length);
          this.ngxSpinnerService.hide();
      }
    })
  };
  

}
