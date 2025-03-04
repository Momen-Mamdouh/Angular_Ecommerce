import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICard } from '../../Interfaces/card';

@Component({
  selector: 'app-categories-slider',
  imports: [RouterLink],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.scss',
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
})

export class CategoriesSliderComponent {

  categoryCards!:ICard[];

  constructor(){

    this.categoryCards= [
      {
        cardImageSrc:`Images/Home_Categories/Women_Fashion.jpg`,
        cardImageAlt:`Women Fashion Clothes Category`,
        cardRouterLink:`/shop/Women's Fashion`,
        cardText:`Women`,
      },

      {
        cardImageSrc:`Images/Home_Categories/Men_Fashion.jpg`,
        cardImageAlt:`Men Fashion Clothes Category`,
        cardRouterLink:`/shop/Men's Fashion`,
        cardText:`Men`,
      },

      {
        cardImageSrc:`Images/Home_Categories/Children_Fashion.jpg`,
        cardImageAlt:`Children Fashion Clothes Category`,
        cardRouterLink:`/shop/childrenCategory`,
        cardText:`Kids`,
      },

      {
        cardImageSrc:`Images/Home_Categories/Ethics_Fashion.jpg`,
        cardImageAlt:`Ethics Fashion Clothes Category`,
        cardRouterLink:`/shop/ethicsCategory`,
        cardText:`Ethics`,
      },

    ]
  }




}
