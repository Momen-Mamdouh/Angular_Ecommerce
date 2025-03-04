import { Component} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsComponent } from "../products/products.component";
import { BrandsSliderComponent } from "../../../Shared/Components/brands-slider/brands-slider.component";
import { CategoriesSliderComponent } from "../../../Shared/Components/categories-slider/categories-slider.component";
import { HomeSliderComponent } from "../../../Shared/Components/home-slider/home-slider.component";




@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, ProductsComponent, BrandsSliderComponent, CategoriesSliderComponent, HomeSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent {
  
}
