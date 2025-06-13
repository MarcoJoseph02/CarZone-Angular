import { Component, inject, Input, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { Router } from '@angular/router';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-stripe',
  imports: [],
  templateUrl: './stripe.component.html',
  styleUrl: './stripe.component.css',
})
export class StripeComponent implements OnInit {
  router = inject(Router);
  handler: any = null;
  toastCounter = 0;

  @Input({ required: true }) title!: string;
  @Input({ required: true }) car!: Car;

  constructor() {}
  ngOnInit(): void {
    this.loadStripe();
  }

  bookCar() {
    if (!localStorage.getItem('id')) {
      this.router.navigate(['/login']);
    }

    const amount = this.car.deposit_amount;
    const model = this.car.model;
    const year = this.car.year;
    const id = this.car.id;
    const isBooked = this.car.is_booked;
    const isSold = this.car.is_sold;

    let toastBox = document.getElementById('toastBox');

    let toast = document.createElement('div');

    if (this.toastCounter < 3) {
      if (!isBooked && !isSold) {
        var handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: function (token: any) {
            const user_id = localStorage.getItem('id');
            const http = new HttpClient(
              new HttpXhrBackend({
                build: () => new XMLHttpRequest(),
              })
            );
            const baseUrl = environment.apiUrl + 'book/';

            http
              .post(baseUrl + id, { user_id: user_id, amount: amount })
              .subscribe({
                next: () => {
                  this.toastCounter++;
                  toast.classList.add('toast');
                  toast.innerHTML =
                    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#008000" stroke-width="1.5"></circle> <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#008000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
                  toast.innerHTML += 'Car booked successfully';
                  toastBox?.appendChild(toast);
                  setTimeout(() => {
                    toast.remove();
                    this.toastCounter--;
                  }, 2300);
                },
                error: () => {
                  this.toastCounter++;
                  toast.classList.add('toast');
                  toast.classList.add('toast-error');
                  toast.innerHTML =
                    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#ff0000" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>';
                  toast.innerHTML += 'Issue with API';
                  toastBox?.appendChild(toast);
                  setTimeout(() => {
                    toast.remove();
                    this.toastCounter--;
                  }, 2300);
                },
              });
          },
        });

        handler.open({
          name: model,
          description: year.toString(),
          amount: amount * 100,
          currency: 'egp',
        });
      } else {
        this.toastCounter++;
        toast.classList.add('toast');
        toast.classList.add('toast-error');
        toast.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#ff0000" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>';
        toast.innerHTML += 'This car is not available for booking';
        toastBox?.appendChild(toast);
        setTimeout(() => {
          // toast.remove();
          // this.toastCounter--;
        }, 2300);
      }
    }
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: function (token: any) {},
        });
      };

      window.document.body.appendChild(s);
    }
  }
}
