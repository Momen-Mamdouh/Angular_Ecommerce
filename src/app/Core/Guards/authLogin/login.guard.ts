import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if(isPlatformBrowser(platformId)){
    const token = localStorage.getItem('loginToken');
        if(token != null){
          return true;
          
        }
        else{
          router.navigate(['/login']);
          return false;
        };
  }
  else{
    return false
  }


};
