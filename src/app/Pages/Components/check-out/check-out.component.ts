import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormHeadingComponent } from "../../../Shared/Components/form-heading/form-heading.component";
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCreditCard, faFileLines, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FormBtnComponent } from "../../../Shared/Components/form-btn/form-btn.component";
import { ApiDataService } from '../../../Core/Services/Api/api-data.service';
import { environment } from '../../../Core/Environments/Environment';
import {  isPlatformBrowser } from '@angular/common';
import { PaymentListComponent } from "../../../Shared/Components/payment-list/payment-list.component";
import { ICart } from '../../../Shared/Interfaces/icart';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAdressessData } from '../../../Shared/Interfaces/iadressess-data';



@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule, FormHeadingComponent, FormBtnComponent, FontAwesomeModule, PaymentListComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit, OnDestroy{

  private readonly formBuilding:FormBuilder = inject(FormBuilder);
  private readonly apiDataService:ApiDataService = inject(ApiDataService);
  private readonly platformId:Object = inject(PLATFORM_ID);
  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly router:Router = inject(Router);
  private readonly ngxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService);



  checkoutForm!:FormGroup;
  loggedUserAllDataSubscription!:Subscription;
  activateRoutesubscription!:Subscription;
  checkOnlinePaymentSubscription!:Subscription;
  checkCashPaymentSubscription!:Subscription;
  getAderressDataSubscription!:Subscription;

  paymentHeadingText!:string;  
  paymentSubHeadingText!:string;
  errorMessage!:string;
  onlineButtonText!:string;
  cashButtonText!:string;
  cartId!:string;
  orderUrl!:string;
  successUrl!:string;
  cancelUrl!:string;
  checkoutSessionEndPoint!:string;
  cashOrderEndPoint!:string;
  
  deliveryCharge!:number;

  hasBackBtn!:boolean;
  successLoading!:boolean;
  onlinePayment!:boolean;
  cashPayment!:boolean;

  shippmentData!:Object;
  cartData!:ICart;
  addressesData!:WritableSignal<IAdressessData[]>;

  homeIcon!:IconDefinition;
  creditCardIocn!:IconDefinition;
  reviewFileIcon!:IconDefinition;


    constructor(){
      this.paymentHeadingText = `Shopping Details`;
      this.paymentSubHeadingText = ``;
      this.errorMessage = ``;
      this.onlineButtonText = `Online Pay`;
      this.cashButtonText = `Cash Pay`;
      this.cartId = ``;
      this.orderUrl = ``;
      this.successUrl = ``;
      this.cancelUrl = ``;
      this.checkoutSessionEndPoint = environment.checkOutSession;
      this.cashOrderEndPoint = environment.cashOrder;
      this.deliveryCharge = environment.deliverCharge;

      this.hasBackBtn = false;
      this.successLoading = false;
      this.onlinePayment = false;
      this.cashPayment = false;

    
      this.shippmentData = {};
      this.cartData = {} as ICart;
      this.addressesData = signal([] as IAdressessData[]);
     
      this.homeIcon = faHouse;
      this.creditCardIocn = faCreditCard;
      this.reviewFileIcon = faFileLines;

    }

    ngOnInit(): void {
      this.intiateForm();
      this.getCartId();   

      if(isPlatformBrowser(this.platformId)){
        this.getLoggedUserCartData();
      }
    }

    ngOnDestroy(): void {
      this.loggedUserAllDataSubscription?.unsubscribe();
      this.activateRoutesubscription?.unsubscribe();
      this.checkOnlinePaymentSubscription?.unsubscribe();
      this.checkCashPaymentSubscription?.unsubscribe();
      this.getAderressDataSubscription?.unsubscribe();
    }

    intiateForm(){
      this.getAddressesData();
      this.checkoutForm = this.formBuilding.group({
        details:[this.addressesData()[0].details, [Validators.required, Validators.minLength(5)]],
        phone:[this.addressesData()[0].phone, [Validators.required, Validators.pattern(/^(\+201|01|00201)[0-2, 5]{1}[0-9]{8}$/)]],
        city:[this.addressesData()[0].city, [Validators.required,]],
      });
    }

    getLoggedUserCartData(){
      this.ngxSpinnerService.show();
      this.loggedUserAllDataSubscription = this.apiDataService.getAllData(environment.getDataFromCart).subscribe({
        next:(response)=>{
          this.cartData = response.data;
          this.ngxSpinnerService.hide(); 
        },
        error:(error)=>{
          console.log(error.message);
          this.ngxSpinnerService.show();
          
        },
      }) 
    } 

    getCartId():void{
       this.activateRoutesubscription =  this.activatedRoute.paramMap.subscribe({
        next:(cardId)=>{
          this.cartId = cardId.get('cartId')!;
          console.log(this.cartId);
             
        },
        error: (error)=>{
          console.log(error);
          
        }
      })
    }

    checkoutOnlinePayment(){ 
      this.checkoutSessionEndPoint += this.cartId + '?' + `${environment.localHost}`;
      this.shippmentData = {
        shippingAddress:this.checkoutForm.value
      }
      this.ngxSpinnerService.show();
      this.checkOnlinePaymentSubscription = this.apiDataService.postData(this.checkoutSessionEndPoint, this.shippmentData ).subscribe({
        next: (response)=>{
          
          this.orderUrl = response.session.url;
          this.successUrl = response.session.success_url;
          this.cancelUrl = response.session.cancel_url;

          if(response.status === 'success'){
            open(this.orderUrl, '_self');
            this.ngxSpinnerService.hide();
          };
          
        }
      })
    }

    checkoutCashPayment(){
      this.cashOrderEndPoint += this.cartId;
      this.shippmentData = {
        shippingAddress:this.checkoutForm.value
      }
      this.ngxSpinnerService.show();
      this.checkCashPaymentSubscription = this.apiDataService.postData(this.cashOrderEndPoint, this.shippmentData ).subscribe({
        next: (response)=>{
            this.router.navigate(['/allorders']);
            this.ngxSpinnerService.hide();
        },
        error:(error)=>{
          console.log(error);
          this.ngxSpinnerService.hide();
        }
      })
    }

    onCheckOut(){
      if(isPlatformBrowser(this.platformId)){
        if(this.cashPayment){
          this.checkoutCashPayment();
        }

        else if(this.onlinePayment){
          this.checkoutOnlinePayment();
        }
        
      }
    };

    getAddressesData():void{
      this.getAderressDataSubscription = this.apiDataService.getAllData(environment.addAdressess).subscribe({
        next:(response)=>{
          this.addressesData.set(response.data);
        },
      })
    }


}
