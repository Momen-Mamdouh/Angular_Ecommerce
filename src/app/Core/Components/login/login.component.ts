import { Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import {  ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiDataService } from '../../Services/Api/api-data.service';
import { SuccessLoaderComponent } from "../../../Shared/Components/success-loader/success-loader.component";
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../Environments/Environment';
import { FormImageComponent } from "../../../Shared/Components/form-image/form-image.component";
import { FormHeadingComponent } from "../../../Shared/Components/form-heading/form-heading.component";
import { FormBtnComponent } from "../../../Shared/Components/form-btn/form-btn.component";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, SuccessLoaderComponent, FormImageComponent, 
            FormHeadingComponent, FormBtnComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  
   private readonly loginSubmation:ApiDataService = inject(ApiDataService);
   private readonly loginNavigation:Router = inject(Router);
   private readonly platformId:Object = inject(PLATFORM_ID)

    loginSubscription!:Subscription;

    loginToken!:string;
    loginHeading!:string;
    loginSubHeading!:string;
    loginImageSrc!:string;
    loginImageAlt!:string;
    buttonText!:string;
    errorMessage!:string;

    hasBackBtn!:boolean;
    successLoading!:boolean;
    


  constructor(){
    this.loginHeading = `Welcome 🫵👋`;
    this.loginSubHeading = `Please Login here`;
    this.loginImageSrc = `/Images/Login/Login_Image.jpg`;
    this.loginImageAlt = `Login`;
    this.buttonText = 'Sign In'
    this.errorMessage = '';

    this.successLoading = false;
    this.hasBackBtn = false;

  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z]\w{8,}$/)]),
  });

  onSubmit():void{  
    if(isPlatformBrowser(this.platformId)){
      if(this.loginForm.valid){
        this.successLoading = true;
        this.loginSubscription = this.loginSubmation.postData(environment.signInEndPoint, this.loginForm.value).subscribe({
          next:(response)=>{
            if(response.message === 'success'){ 
              localStorage.setItem('loginToken', response.token);
              this.loginSubmation.getUserDataFromLoggedToken();
              this.loginNavigation.navigate(['/home']);
            }
          },
          error:(error:HttpErrorResponse)=>{
            this.errorMessage = error.error.message;
            this.successLoading = false;
          },
        });
      }
      else{
        this.loginForm.markAllAsTouched();
        }
    }
  
      
  }





}














 //   imageSrc:`Images/Login/Login_Image.jpg`,
  //   imageAlt:`Login Image`,
  // }

  // loginHeading:IAuthHeading = {
  //   headingText:`Welcome 🫵🏻👋🏻`,
  //   detailsText:`Please Login here`
  // }
 
  // loginInputs:IAuthInputs[]= [
  //   {
  //     formName:`string`,
  //     inputName:`string`,
  //     inputText:`string`,
  //     inputId:`string`,
  //     inputType:`string`,
  //     inputPlaceholder:`string`,
  //     inputForm:`string`,
  //   },

  //   {
  //     formName:`string`,
  //     inputName:`string`,
  //     inputText:`string`,
  //     inputId:`string`,
  //     inputType:`string`,
  //     inputPlaceholder:`string`,
  //     inputForm:`string`,
  //   },
  // ];


  // loginBtn:IAuthBtn = {
  //   btnValue:`string`,
  // };

  // loginForm:FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z]\w{8,}$/)]),
  // });
      

  // loginImages:IAuthImages ={