import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';

// import Swiper JS
import Swiper from 'swiper';
import { Navigation, Pagination} from 'swiper/modules'
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from "../../pipes/product-image.pipe";


@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html',
  styles: `
    .swiper{
      width: 100%;
      height: 500px;
    }
  `
})
export class ProductCarouselComponent implements AfterViewInit {

  images = input.required<string[]>();
  swiperdiv = viewChild.required<ElementRef>('swiperdiv')

  ngAfterViewInit(): void {
    const element = this.swiperdiv().nativeElement;
    if (!element) { return };

    console.log({element});

    const swiper = new Swiper( element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [
        Navigation,
        Pagination
      ],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

 }
