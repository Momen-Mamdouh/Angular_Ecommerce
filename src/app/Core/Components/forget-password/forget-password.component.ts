import { Component, inject, OnDestroy } from '@angular/core';
import { ApiDataService } from '../../Services/Api/api-data.service';
import { environment } from '../../Environments/Environment';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormImageComponent } from "../../../Shared/Components/form-image/form-image.component";
import { FormHeadingComponent } from "../../../Shared/Components/form-heading/form-heading.component";

import { Subscription } from 'rxjs';
import { FormModalComponent } from "../../../Shared/Components/form-modal/form-modal.component";

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, FontAwesomeModule, FormImageComponent, FormHeadingComponent, FormModalComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnDestroy {
    private readonly forgetPasswordSubamtion:ApiDataService = inject(ApiDataService);
    private readonly forgetPasswordNavigation:Router = inject(Router);

    forgetPasswordSubscription!:Subscription;
    
    forgetPassowrdHeading!:string;
    forgetPassowrdSubHeading!:string;
    forgetPasswordImageSrc!:string;
    forgetPasswordImageAlt!:string;
    modalHeading!:string;
    modalSubHeading!:string;
    modalButtonText!:string;
    modalRouterLink!:string;


    hasBackBtn!:boolean;
    isLoading!:boolean;
    errorMessage!:string;
  

  constructor(){
    this.forgetPassowrdHeading = 'Forget Passowrd';
    this.forgetPassowrdSubHeading = "Enter your Registered email address. we'll send you a code to reset your Password";
    this.forgetPasswordImageSrc = `/Images/ForgetPassword/forgetPassword3.jpg`;
    this.forgetPasswordImageAlt = `ForgetPassword`;
    this.modalHeading = `Check Email Box`;
    this.modalSubHeading = `We send an Email with 6-digits`;
    this.modalButtonText = `Go to OTP Page`;
    this.modalRouterLink = `/checkOTP`;
    this.isLoading = false;
    this.hasBackBtn = true;
    this.errorMessage = '';

  }


   forgetPasswordForm:FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
  });

  ngOnDestroy(): void {
    this.forgetPasswordSubscription?.unsubscribe();
  }

   onSubmit():void{  
       if(this.forgetPasswordForm.valid){
        this.isLoading = true;
        this.forgetPasswordSubscription =  this.forgetPasswordSubamtion.postData(environment.forgetPasswordEndPoint, this.forgetPasswordForm.value).subscribe({
          next:(response)=>{
              this.forgetPasswordNavigation.navigate(['/checkOTP'])  
          },
          error:(error:HttpErrorResponse)=>{
            this.errorMessage = error.error.message;
            this.isLoading = false;
          },
        });
       }
       else{
        this.forgetPasswordForm.markAllAsTouched();
       }
        
    }

}
