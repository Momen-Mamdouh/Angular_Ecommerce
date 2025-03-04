import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { coreInterceptor } from './Core/Interceptors/coreInterceptor/core.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorsInterceptor } from './Core/Interceptors/error/errors.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,
      withHashLocation(),
      withInMemoryScrolling({scrollPositionRestoration:'top'}),
      withViewTransitions(),
    ), 
    provideAnimations(), 
    
    provideToastr({
      timeOut: 7000,
      closeButton:true,
      easing:'ease-in-out',
      easeTime: 1000,
      progressBar:true
    }),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([coreInterceptor, errorsInterceptor])),
    importProvidersFrom(
      NgxSpinnerModule, TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide: TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient],
      }
    }),
    

  )
  
  ]
};
