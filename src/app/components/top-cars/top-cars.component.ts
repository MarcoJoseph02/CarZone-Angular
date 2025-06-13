import { Component, inject, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { map, Subscription } from 'rxjs';
import { CarService } from '../../services/car.service';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';
import { RouterLink } from '@angular/router';
import { EgpCurrencyPipe } from "../../pipes/egp-currency.pipe";
import { StripeComponent } from "../stripe/stripe.component";

@Component({
  selector: 'app-top-cars',
  templateUrl: './top-cars.component.html',
  styleUrls: ['./top-cars.component.css'],
  imports: [ImageLoaderComponent, RouterLink, EgpCurrencyPipe, StripeComponent],
})
export class TopCarsComponent implements OnInit {
  cars: Car[] = [];
  carService = inject(CarService);
  carSubscription: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    this.carSubscription = this.carService
      .getCars()
      .pipe(
        map((cars) => {
          this.cars = cars.data
            .sort((a, b) => {
              return b.price - a.price;
            })
            .slice(0, 6);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.carSubscription.unsubscribe();
  }
}
