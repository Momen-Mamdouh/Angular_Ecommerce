import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../Environments/Environment';
import { ApiDataService } from '../../Services/Api/api-data.service';
import { FormImageComponent } from '../../../Shared/Components/form-image/form-image.component';
import { FormHeadingComponent } from "../../../Shared/Components/form-heading/form-heading.component";
import { FormBtnComponent } from "../../../Shared/Components/form-btn/form-btn.component";
import { FormModalComponent } from '../../../Shared/Components/form-modal/form-modal.component';

import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-check-otp',
  imports: [ReactiveFormsModule,  FormImageComponent, FormHeadingComponent, 
              FormBtnComponent, FormModalComponent],
  templateUrl: './check-otp.component.html',
  styleUrl: './check-otp.component.scss'
})
export class CheckOTPComponent {
 private readonly forgetPasswordSubamtion:ApiDataService = inject(ApiDataService);
 
    forgetPasswordSubscription!:Subscription;

    verifyResetCodeImageSrc!:string;
    verifyResetCodeImageAlt!:string;
    checkOTPHeading!:string;
    checkOTPSubHeading!:string;
    resetCode!:string;
    buttonText!:string;
    errorMessage!:string;
    modalHeading!:string;
    modalSubHeading!:string;
    modalButtonText!:string;
    modalRouterLink!:string;
  
    isLoading!:boolean;
    vaildOTP!:boolean;
    hasBackBtn!:boolean;
   
    dataSent!:Object;

  constructor(){
    this.verifyResetCodeImageSrc = `/Images/Check_OTP/checkOTP5.jpg`;
    this.verifyResetCodeImageAlt = `Verify Reset Code`;
    this.checkOTPHeading = 'Enter OTP';
    this.checkOTPSubHeading = "We've share a code of your registered email address";
    this.resetCode = ``;
    this.buttonText = 'Verify';
    this.errorMessage = '';
    this.modalHeading = `Vaild OTP`;
    this.modalSubHeading = `Now you can change Your Password`;
    this.modalButtonText = `Change Passowrd`;
    this.modalRouterLink = `/changePassword`;

    this.isLoading = false;
    this.vaildOTP = false;
    this.hasBackBtn = true;
    this.dataSent = {};
   
  }

  ngOnDestroy(): void {
    this.forgetPasswordSubscription?.unsubscribe();
    
  }

    checkOtpForm:FormGroup = new FormGroup({
        firstNumber: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]/)]),
        secondNumber: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]/)]),
        thirdNumber: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]/)]),
        fourthNumber: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]/)]),
        fifthNumber: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]/)]),
        sixthNumber: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]/)]),
    });


    sendResetCode(){
        (Object.values(this.checkOtpForm.value)).forEach((number)=>{
          this.resetCode += `${number}`;         
        });
        this.dataSent = {
          'resetCode': this.resetCode,
        }
    }

    onSubmit():void{  
        if(this.checkOtpForm.valid){
          
        this.isLoading = true;
        this.sendResetCode();
        
        this.forgetPasswordSubscription =  this.forgetPasswordSubamtion.postData(environment.verifyResetCodeEndPoint, this.dataSent).subscribe({
          next:(response)=>{
              this.vaildOTP = true;
          },
          error:(error:HttpErrorResponse)=>{
            this.errorMessage = error.error.message;
            this.vaildOTP = false;

          }
        });
        }
        else{
          this.checkOtpForm.markAllAsTouched();
        }
        
    }
}
