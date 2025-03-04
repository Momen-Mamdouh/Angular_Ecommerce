import { Component, computed, inject, OnDestroy, OnInit, PLATFORM_ID,  signal, Signal,  } from '@angular/core';
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { ICart, ICartProduct } from '../../../Shared/Interfaces/icart';
import { environment } from '../../../Core/Environments/Environment';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { PaymentListComponent } from "../../../Shared/Components/payment-list/payment-list.component";
import { CartApiService } from '../../../Core/Services/cartApi/cart-api.service';
import { NoProductsComponent } from "../../../Shared/Components/no-products/no-products.component";
import { ICard } from '../../../Shared/Interfaces/card';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule, CurrencyPipe, RouterLink, PaymentListComponent, NoProductsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {

  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly cartApiService:CartApiService = inject(CartApiService);
  private readonly ngxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService);
  private readonly platformId:Object = inject(PLATFORM_ID);

  loggedUserAllDataSubscription!:Subscription;
  updatedCartSubscription!:Subscription;
  removingProductSubscription!:Subscription;

  cardId!:string;
  dataResponse!:string;
  deliveryCharge!:number;
  count!:Object;
  cartData!:ICart;
  emptyCartData!:ICard;
  cartProducts!:Signal<ICartProduct[]>;
  
  deleteIcon:IconDefinition;
  plusIcon:IconDefinition;
  minusIcon:IconDefinition;

  constructor(){
    this.cardId = ``;
    this.dataResponse = '';
    this.count = {};
    this.cartData = {} as ICart;
    this.cartProducts = signal([] as ICartProduct[]);
  
    this.emptyCartData = {
      cardImageSrc:'Images/Cart/empty-cart.jpg',
      cardImageAlt:'shopping-cart-isolated-white-background',
      cardRouterLink:'string',
      cardText:'Looks like you have not added anything to your cart. Go ahead & explore top categories.',
      cardHeading:'Your cart is empty',
    };
   
    this.deleteIcon = faTrash;
    this.plusIcon = faPlus;
    this.minusIcon = faMinus;
  }
    

    ngOnInit(): void {
      if(isPlatformBrowser(this.platformId)){
        this.getLoggedUserCartData(); 
        this.cartProducts = computed(()=>this.cartApiService.productsAddedData());      
      }
    };

    ngOnDestroy(): void {
        this.loggedUserAllDataSubscription?.unsubscribe();
        this.updatedCartSubscription?.unsubscribe();
        this.removingProductSubscription?.unsubscribe();
    }

    getLoggedUserCartData(){
      this.ngxSpinnerService.show();
      this.loggedUserAllDataSubscription = this.apiDataService.getAllData(environment.getDataFromCart).subscribe({
        next:(response)=>{
          this.cartData = response.data;
          this.cartApiService.numberOfCartItems.set(response.numOfCartItems); 
          this.cartApiService.productsAddedData.set(response.data.products);   
          this.dataResponse = response.status;
          this.ngxSpinnerService.hide();
                    
        },
  
      }) 
    };

    updateCartProductQuantity(productId:string){
      const cartQuantityUpate = environment.changeCart +productId;
      this.updatedCartSubscription = this.apiDataService.putData(cartQuantityUpate, this.count).subscribe({
        next:(response)=>{
          this.cartData.totalCartPrice = response.data.totalCartPrice;
          this.cartApiService.productsAddedData.set(response.data.products);

        },
      }) 
    };

    plusProduct(cardProductCount:number, clickedProductId:string){
        this.count = {
          "count": `${cardProductCount+1}`
        }
        this.updateCartProductQuantity(clickedProductId)


    };

    minusProduct(cardProductCount:number, clickedProductId:string){
      this.count = {
        "count": `${cardProductCount-1}`
      };
      this.updateCartProductQuantity(clickedProductId)
     
    };

    removeSpecficProduct(productId:string){
      const cartQuantityUpate = environment.changeCart +productId;
      this.removingProductSubscription  = this.apiDataService.deleteData(cartQuantityUpate).subscribe({
        next:(response)=>{
          this.cartData.totalCartPrice =response.data.totalCartPrice;
          this.cartApiService.numberOfCartItems.set(response.numOfCartItems);
          this.cartApiService.productsAddedData.set(response.data.products); 

        },
      }) 
    };
    
    clearCart(productId:string=''){
      const cartQuantityUpate = environment.changeCart +productId;
      this.removingProductSubscription = this.apiDataService.deleteData(cartQuantityUpate).subscribe({
        next:(response)=>{     
          this.cartApiService.numberOfCartItems.set(0); 
          this.cartApiService.productsAddedData.set([]);
          this.cartData.totalCartPrice = 0.00;
          
          
        },
      }) 
    };


   


}