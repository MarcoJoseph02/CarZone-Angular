import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { EgpCurrencyPipe } from '../../pipes/egp-currency.pipe';
import { StripeComponent } from '../stripe/stripe.component';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
  imports: [
    RouterLink,
    CommonModule,
    ImageGalleryComponent,
    EgpCurrencyPipe,
    StripeComponent,
  ],
})
export class CarDetailsComponent implements OnInit {
  private readonly carServices = inject(CarService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  car!: Car;
  constructor() {}

  ngOnInit() {
    const id = this.route.snapshot.params['carId'];
    this.carServices.getCarById(id).subscribe({
      next: (car) => {
        this.car = car.data;
      },
      error: () => {
        this.router.navigate(['/allcars']);
      },
    });
  }
}
