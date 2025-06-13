import { Component, Input } from '@angular/core';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';
import { RouterLink } from '@angular/router';
import { EgpCurrencyPipe } from "../../pipes/egp-currency.pipe";

@Component({
  selector: 'app-card',
  imports: [ImageLoaderComponent, RouterLink, EgpCurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) hasImage = false;
  car:any;
}
