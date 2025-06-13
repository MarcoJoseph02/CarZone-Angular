import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { map, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';
import { RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { EgpCurrencyPipe } from '../../pipes/egp-currency.pipe';
import { StripeComponent } from '../stripe/stripe.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers: [CarService],
  imports: [
    FormsModule,
    ImageLoaderComponent,
    CommonModule,
    EgpCurrencyPipe,
    StripeComponent,
    RouterLink,
  ],
})
export class CarsComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  carService = inject(CarService);

  carSubscription: Subscription = new Subscription();

  currentPage = 1;
  itemsPerPage = 20;
  totalPages?: number;
  totalPagesArr: number[] = [];
  paginatedCars: Car[] = [];

  constructor() {}

  sortValue = '';

  ngOnInit() {
    this.carSubscription = this.carService
      .getCars()
      .pipe(
        map((cars) => {
          this.cars = cars.data;
          this.paginate(this.itemsPerPage);
          this.calcTotalPages();
        })
      )
      .subscribe();
    // this.cars = CARS;
    // this.paginate(this.itemsPerPage);
    // this.calcTotalPages();
  }

  sortCars(sortBy: string) {
    switch (sortBy) {
      case 'Model':
        this.paginatedCars.sort((car1, car2) => {
          return car1.model > car2.model ? 1 : car1.model < car2.model ? -1 : 0;
        });
        break;
      case 'Year':
        this.paginatedCars.sort((car1, car2) => {
          return car1.year > car2.year ? 1 : car1.year < car2.year ? -1 : 0;
        });
        break;
      case 'PriceLTH':
        this.paginatedCars.sort((car1, car2) => {
          return car1.price > car2.price ? 1 : car1.price < car2.price ? -1 : 0;
        });
        break;
      case 'PriceHTL':
        this.paginatedCars.sort((car1, car2) => {
          return car1.price > car2.price ? -1 : car1.price < car2.price ? 1 : 0;
        });
        break;

      default:
        this.paginatedCars.sort((car1, car2) => {
          return car1.id > car2.id ? 1 : car1.id < car2.id ? -1 : 0;
        });
        break;
    }
  }

  paginate(numOfItems: number, reset?: boolean) {
    if (reset) {
      this.changePage(1);
    }
    this.itemsPerPage = numOfItems;
    const start = numOfItems * (this.currentPage - 1);
    this.paginatedCars = this.cars.slice(start, start + numOfItems);
    this.calcTotalPages();
  }

  calcTotalPages(): void {
    this.totalPages = Math.ceil(this.cars.length / this.itemsPerPage);

    this.totalPagesArr = Array.from(
      { length: this.totalPages },
      (_, i) => 1 + i
    );
  }

  changePage(pageNum: number) {
    this.currentPage = pageNum;
    this.paginate(this.itemsPerPage);
  }

  ngOnDestroy(): void {
    this.carSubscription.unsubscribe();
  }
}
