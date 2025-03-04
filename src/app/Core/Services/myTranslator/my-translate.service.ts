import { Injectable, Inject, PLATFORM_ID, inject, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private readonly renderer2 = inject(RendererFactory2).createRenderer(null, null);
  defaultLang = 'en';

  constructor(private translateService: TranslateService, 
    @Inject(PLATFORM_ID) private platformId: Object,) {

      if(isPlatformBrowser(this.platformId)) {
        const savedLang = localStorage.getItem('lang')!;
          if (savedLang) {
            this.defaultLang = savedLang;
        }
      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang)!;
      this.changeDir();
    }
  }



  changeDir():void{
    if(localStorage.getItem('lang') === 'en'){
        this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
        this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
    }
    else if(localStorage.getItem('lang') === 'ar'){
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar')
    }
  }

  changeLang(lang: string) {
    // At Clicking in Lang Btn
    localStorage.setItem('lang', lang),
    this.translateService.use(lang);
    this.changeDir();
  }


}