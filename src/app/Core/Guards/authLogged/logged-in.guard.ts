import { inject, PLATFORM_ID  } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export const loggedInGuard: CanActivateFn = (route, state) => {
 const router = inject(Router);
 const platformId = inject(PLATFORM_ID);
 
 if(isPlatformBrowser(platformId)){
  const token = localStorage.getItem('loginToken');
      if(token != null){
        router.navigate(['/home']);
        return false;
      }
      else{
        return true;
      };
    }

    else{
      return false
    }
  
   
};
