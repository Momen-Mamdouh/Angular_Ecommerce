import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { environment } from '../../Environments/Environment';
import { ApiDataService } from '../../Services/Api/api-data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormHeadingComponent } from "../../../Shared/Components/form-heading/form-heading.component";
import { FormImageComponent } from "../../../Shared/Components/form-image/form-image.component";
import { FormModalComponent } from "../../../Shared/Components/form-modal/form-modal.component";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, FontAwesomeModule, FormHeadingComponent, FormImageComponent, FormModalComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnDestroy{

    private readonly resetPasswordSubamtion:ApiDataService = inject(ApiDataService);
   


    resetPasswordSubscription!:Subscription;
    resetPassowrdHeading!:string;
    resetPassowrdSubHeading!:string;
    resetPasswordImageSrc!:string;
    resetPasswordImageAlt!:string;
    modalHeading!:string;
    modalSubHeading!:string;
    modalButtonText!:string;
    modalRouterLink!:string;
    errorMessage!:string;
    

    hasBackBtn!:boolean;
    isLoading!:boolean;
    showModal!:boolean;
    newData!:Object;

  constructor(){
    this.resetPassowrdHeading = 'Reset Passowrd';
    this.resetPassowrdSubHeading = "Enter your Registered email address and your new password";
    this.resetPasswordImageSrc = `/Images/ForgetPassword/forgetPassword3.jpg`;
    this.resetPasswordImageAlt = `ForgetPassword`;
    this.modalHeading = `Password Changed Successfully`;
    this.modalSubHeading = `Your Password has been Updated Successfully`;
    this.modalButtonText = `Back to Login`;
    this.modalRouterLink = `/login`;
    this.errorMessage = '';
 
    this.isLoading = false;
    this.hasBackBtn = true;
    this.showModal = false;
    
    this.newData = {};
  }


   resetPasswordForm:FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
      newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z]\w{8,}$/)]),
      rePassword: new FormControl(null, Validators.required),
  },{validators: this.confrimPassword});


  ngOnDestroy(): void {
    this.resetPasswordSubscription?.unsubscribe();
  }

  onSubmit():void{  
      if(this.resetPasswordForm.valid){
      
      this.newData = {
        email: this.resetPasswordForm.get('email')!.value,
        newPassword: this.resetPasswordForm.get('newPassword')!.value
      }
    
      this.resetPasswordSubscription = this.resetPasswordSubamtion.putData(environment.resetPasswordEndPoint, this.newData).subscribe({
        next:(response)=>{
            this.isLoading = true;
        },
        error:(error:HttpErrorResponse)=>{
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },

      });
      }
      else{
      this.resetPasswordForm.markAllAsTouched();
      }
      
  }

  resetPassword():void{
    this.showModal = true;
  }
    
  confrimPassword(group:AbstractControl){
      const passwordValue =  group.get('newPassword')?.value;
      const rePasswordValue =  group.get('rePassword')?.value;
      return passwordValue === rePasswordValue? null : {mismatch:true};
  }

}
