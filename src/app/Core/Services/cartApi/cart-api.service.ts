import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICart, ICartProduct } from '../../../Shared/Interfaces/icart';
import { environment } from '../../Environments/Environment';
import { ApiDataService } from '../Api/api-data.service';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly toastrService:ToastrService = inject(ToastrService);
  private readonly platformId:Object = inject(PLATFORM_ID);

  loggedUserAllData!:Subscription;
  updatedCart!:Subscription;
  removingProduct!:Subscription;
  cartDataSubscription!:Subscription;

  cartDataEndPoint!:string;
  cartQuantityUpate!:string;
  cardId!:string;
  token!: string;

  deliveryCharge!:number;

  headers!:Object;
  count!:Object;
  bodyData!:Object;

  cartData!:ICart;
  cartProducts!:ICartProduct[];

  
  numberOfCartItems!:WritableSignal<number>;
  productsAddedData!:WritableSignal<ICartProduct[]>;
  detailedProductCount!:WritableSignal<number>;
  
  constructor() { 
    this.cartDataEndPoint = environment.getDataFromCart;
    this.cartQuantityUpate = environment.changeCart;
    this.deliveryCharge = 5;

    this.count = {};
    this.bodyData = {};
    this.cartData = {} as ICart;
    this.cartProducts = [] as ICartProduct[];
 
    this.numberOfCartItems = signal(0);
    this.productsAddedData = signal([] as ICartProduct[]);
    this.detailedProductCount = signal(0);

  }

   ngOnInit(): void {

      if(isPlatformBrowser(this.platformId)){
        this.getLoggedUserCartData();
      }
    };

    ngOnDestroy(): void {
        this.loggedUserAllData?.unsubscribe();
        this.updatedCart?.unsubscribe();
        this.removingProduct?.unsubscribe();
        this.removingProduct?.unsubscribe();    
        this.cartDataSubscription?.unsubscribe(); 

    }

  getLoggedUserCartData(){
      this.loggedUserAllData = this.apiDataService.getAllData(this.cartDataEndPoint, this.headers).subscribe({
        next:(response)=>{
          this.cartData = response.data;
          this.cartProducts = response.data.products      
        },
        error:(error)=>{
          console.log(error);
          
        },
      }) 
  } 




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

  updateCartProductQuantity(productId:string){
    const cartQuantityUpate = this.cartQuantityUpate+productId;
    this.updatedCart = this.apiDataService.putData(cartQuantityUpate, this.count , this.headers).subscribe({
      next:(response)=>{
        this.cartProducts = response.data.products
      },
      error:(error)=>{
        console.log(error);
        
      },
    }) 
  };

  removeSpecficProduct(productId:string){
    const cartQuantityUpate = this.cartQuantityUpate+productId;
    this.removingProduct = this.updatedCart = this.apiDataService.deleteData(cartQuantityUpate, this.headers).subscribe({
      next:(response)=>{
        this.cartProducts = response.data.products
      },
      error:(error)=>{
        console.log(error);
      },
    }) 
  };

  clearCart(productId:string=''){

    
    const cartQuantityUpate = this.cartQuantityUpate+productId;
    this.removingProduct = this.apiDataService.deleteData(cartQuantityUpate, this.headers).subscribe({
      next:(response)=>{     
        this.cartProducts = [];
        this.cartData.totalCartPrice = 0.00;
      },
      error:(error)=>{
        console.log(error);
      },
    }) 
  };


  // showSuccess() {
  //   this.toastrService.success("You're Welcomed", 'Product added Successfully !',);
  // };
  
  // showError(errorMessage:string) {
  //   this.toastrService.error(errorMessage, "Product isn't added :(",);
  // };
}
