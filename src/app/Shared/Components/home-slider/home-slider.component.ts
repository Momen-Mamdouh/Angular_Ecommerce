import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IImagesSrcOnly } from '../../Interfaces/iimages-src-only';

@Component({
  selector: 'app-home-slider',
  imports: [],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.scss',
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
})



export class HomeSliderComponent {

    swiperImagesData!:IImagesSrcOnly[];


    constructor(){
      this.swiperImagesData = [
        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero1.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero2.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero3.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero4.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero5.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero6.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero7.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero8.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero9.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero10.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero11.jpg`,
        },
        
        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero12.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero13.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero14.jpg`,
        },

        {
          homeSliderImageSrc:`/Images/Home_Header/Home_Hero15.jpg`,
        },
   

      ]
    }

}
