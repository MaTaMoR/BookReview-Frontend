import { Component } from '@angular/core';
import {ReviewsService} from "../../../services/reviews.service";
import {ReviewResponse} from "../../../interfaces/interfaces";
import SwiperCore, {
    Autoplay,
    Navigation,
    SwiperOptions
} from 'swiper';

SwiperCore.use([Navigation, Autoplay])

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

    sliderConfig: SwiperOptions = {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 10,
        autoplay: {
            delay: 2500
        },
        navigation: true,
        pagination: {
            clickable: true
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            800: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1600: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            2000: {
                slidesPerView: 5,
                spaceBetween: 10
            }
        }
    }

    reviews!: ReviewResponse[];

    constructor(private reviewService: ReviewsService) {
        reviewService.mainPage().subscribe((result) => {
            this.reviews = result.content;
        });
    }

    onClick(a: any): void {
        console.log(a);
    }
}
