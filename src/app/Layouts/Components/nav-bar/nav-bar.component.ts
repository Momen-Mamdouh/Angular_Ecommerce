import { environment } from './../../../Core/Environments/Environment';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faMagnifyingGlass, faHeart, faCartShopping, faTrash } from "../../../../../node_modules/@fortawesome/free-solid-svg-icons";
import { IMegaMenuData, INavbarIconsData } from "../../../Shared/Interfaces/navbar";
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { ICart, ICartProduct } from '../../../Shared/Interfaces/icart';
import { Subscription } from 'rxjs';
import { CartApiService } from '../../../Core/Services/cartApi/cart-api.service';
import { WishListService } from '../../../Core/Services/wishListApi/wish-list.service';


@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, CurrencyPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly platformId:Object = inject(PLATFORM_ID);
  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly cartApiService:CartApiService = inject(CartApiService);
  private readonly wishListService:WishListService = inject(WishListService);
  
  
  loggedUserAllData!:Subscription;
  removingProduct!:Subscription;
  wishListUserData!:Subscription;
  activeRouteSubscription!:Subscription;

  token!:string;
  cartQuantityUpate!:string;
  cartId!:string;

  isLogin:boolean = this.defineNavbarBtns();
  showMegaMenu!:boolean;
  showCartMenu!:boolean;
  count!:Object;
  cartData!:ICart;
  meagMenuData:IMegaMenuData[];
  iconsData:INavbarIconsData[];

  cartProducts!:Signal<ICartProduct[]>;
  numberOfCartItems!:Signal<number>;
  numberOfWishListItems!:Signal<number>;
  
  chevronDown:IconDefinition = faChevronDown;
  heartIcon:IconDefinition = faHeart;
  searchIcon:IconDefinition = faMagnifyingGlass;
  shoppingCarIcon:IconDefinition = faCartShopping;
  deleteIcon:IconDefinition = faTrash;
  environmentData = environment;
  constructor(){
    this.iconsData = [
      {
        icon:faHeart,
        iconInTag:'Heart Like',
        iconHoverClass:'hover:text-red-500',
      },

      {
        icon:faCartShopping,
        iconInTag:'Shopping Cart',
        iconHoverClass:'hover:text-yellow-500',
      },

    ]
    this.meagMenuData = [

      {
        menuName: 'menMenu',
        subMenuName:'menItems',
        itemsName:'Men',
        subItemsName:'menSubItems',
        subItemName: 'indianItems',
        subItemAnchorName:'Indian & Festive Wear',
        routerLink:`shop/Men's Fashion`,
        itemsNames:[
          {
            itemName:'T-Shirts',
             routerLink:`shop/Men's Fashion`,
          },
  
          {
            itemName:'Casual Shirts',
             routerLink:`shop/Men's Fashion`,
          },
  
          {
            itemName:'Formal Shirts',
             routerLink:`shop/Men's Fashion`,
          },
  
          {
            itemName:'Jackets',
             routerLink:`shop/Men's Fashion`,
          },
  
          {
            itemName:'Blazers & Coats',
             routerLink:`shop/Men's Fashion`,
          },
  
        ],
        subItemsNames:[
          {
            itemName:'Kurtas & Kurta Sets',
            routerLink:`shop/Men's Fashion`,
          },
  
          {
            itemName:'Sherwains',
            routerLink:`shop/Men's Fashion`,
          },
        ],
      },
  
      {
        menuName: 'womenMenu',
        subMenuName:'womenItems',
        itemsName:'Women',
        subItemsName:'womenSubItems',
        subItemName: 'westernWearItems',
        subItemAnchorName:'Western Wear',
        routerLink:`shop/Women's Fashion`,
        itemsNames:[
          {
            itemName:'Kurtas & Suits',
            routerLink:`shop/Women's Fashion`,
          },
  
          {
            itemName:'Sarees',
            routerLink:`shop/Women's Fashion`,
          },
  
          {
            itemName:'Ethnic Wear',
            routerLink:`shop/Women's Fashion`,
          },
  
          {
            itemName:'Lehenga Cholis',
            routerLink:`shop/Women's Fashion`,
          },
  
          {
            itemName:'Jackets',
            routerLink:`shop/Women's Fashion`,
          },
  
        ],
        subItemsNames:[
          {
            itemName:'Dresses',
            routerLink:`shop/Women's Fashion`,
          },
  
          {
            itemName:'JumpSuits',
            routerLink:`shop/Women's Fashion`,
          },
        ],
      },
  
      {
        menuName: 'footMenu',
        subMenuName:'footItems',
        itemsName:'FootWear',
        subItemsName:'footSubItems',
        subItemName: 'productFeaturesItems',
        subItemAnchorName:'Product Features',
        routerLink:`shop/Foot's Fashion`,
        itemsNames:[
          {
            itemName:'Flats',
            routerLink:`shop/Foot's Fashion`,
          },
  
          {
            itemName:'Casual Shoes',
            routerLink:`shop/Foot's Fashion`,
          },
  
          {
            itemName:'Heels',
            routerLink:`shop/Foot's Fashion`,
          },

  
          {
            itemName:'Boots',
            routerLink:`shop/Foot's Fashion`,
          },
  
          {
            itemName:'Sport Shoes & Floaters',
            routerLink:`shop/Foot's Fashion`,
          },
  
        ],
        subItemsNames:[
          {
            itemName:'360 Product Viewer',
            routerLink:`shop/Foot's Fashion`,
          },
  
          {
            itemName:'Product With Video',
            routerLink:`shop/Foot's Fashion`,
          },
        ],
      },
  
      {
        menuName: 'kidsMenu',
        subMenuName:'kidsItems',
        itemsName:'Kids',
        subItemsName:'kidsSubItems',
        subItemName: '',
        subItemAnchorName:'',
        routerLink:`shop/Kid's Fashion`,
        itemsNames:[
          {
            itemName:'T-Shirts',
            routerLink:`shop/Kid's Fashion`,
          },
  
          {
            itemName:'Jeans',
            routerLink:`shop/Kid's Fashion`,
          },
  
          {
            itemName:'Trousers',
            routerLink:`shop/Kid's Fashion`,
          },
  
          {
            itemName:'Party Wear',
            routerLink:`shop/Kid's Fashion`,
          },
  
          {
            itemName:'Innerwear & Thermal',
            routerLink:`shop/Kid's Fashion`,
          },

  
          {
            itemName:'Track Pants',
            routerLink:`shop/Kid's Fashion`,
          },
  
          {
            itemName:'Value Pack',
            routerLink:`shop/Kid's Fashion`,
          },
  
        ],
        subItemsNames:[
          {
            itemName:'',
            routerLink:`shop/Kid's Fashion`,
          },
        ],
      },
  
    ];
    this.cartData = {} as ICart;
    this.count = {};
    this.cartProducts = signal([] as ICartProduct[]);



    this.cartId = ``;
    this.showMegaMenu = false;
    this.showCartMenu = false;

  }


  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.getLoggedUserCartData();
      this.getLoggedWishListData();
      this.numberOfCartItems = computed(()=>this.cartApiService.numberOfCartItems());
      this.cartProducts = computed(()=>this.cartApiService.productsAddedData());
      this.numberOfWishListItems = computed(()=>this.wishListService.numberOfWishListItems());    
    };
  };

  ngOnDestroy(): void {
    this.loggedUserAllData?.unsubscribe();
    this.removingProduct?.unsubscribe();
    this.wishListUserData?.unsubscribe();
    this.activeRouteSubscription?.unsubscribe();
  }

  getLoggedUserCartData():void{
    this.loggedUserAllData =  this.apiDataService.getAllData(environment.getDataFromCart).subscribe({
        next:(response)=>{    
        this.cartApiService.numberOfCartItems.set(response.numOfCartItems); 
        this.cartApiService.productsAddedData.set(response.data.products);
        this.cartData = response.data;

        }
      }) 

  };

  getLoggedWishListData():void{
    this.wishListUserData = this.apiDataService.getAllData(environment.getUserWishList).subscribe({
        next:(response)=>{    
        this.wishListService.numberOfWishListItems.set(response.count);        
        }
      }) 

  };


  removeSpecficProduct(productId:string):void{
    const cartQuantityUpate = environment.changeCart + productId;
    this.removingProduct = this.apiDataService.deleteData(cartQuantityUpate).subscribe({
      next:(response)=>{
        this.cartData = response.data;
        this.cartApiService.numberOfCartItems.set(response.numOfCartItems);
        this.cartApiService.productsAddedData.set(response.data.products);
        this.cartData.totalCartPrice =response.data.totalCartPrice;
        
        
       
      },
      error:(error)=>{
        console.log(error);
      },
    }) 
  };

  getCartId():void{
    this.activeRouteSubscription = this.activatedRoute.paramMap.subscribe({
     next:(cardId)=>{
       this.cartId = cardId.get('cartId')!;   
     },
     error: (error)=>{
       console.log(error);
       
     }
   })
  };

  logOut():void{
   this.apiDataService.logOut();
  }

  toggleMenu(menuName:string) {
    if(menuName === 'MegaMenu'){
      this.showMegaMenu = !this.showMegaMenu;
    }
    else if(menuName === 'CartMenu'){
      this.showCartMenu = !this.showCartMenu
    }
    
  }

  defineNavbarBtns():boolean {
    if(isPlatformBrowser(this.platformId)){
      this.token = localStorage.getItem('loginToken')!;
          if(this.token !=null) {
            return true
          } 
          else{
            return false
          }    
    }
    else{
      return false
    }   
  };
 

}
  





  


