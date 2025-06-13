import { Component, OnInit } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { TopCarsComponent } from '../top-cars/top-cars.component';
import { ServicesComponent } from '../our-services/services.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { CommentsComponent } from "../comments/comments.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    WelcomeComponent,
    TopCarsComponent,
    ServicesComponent,
    CommentsComponent
],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  scrollTo(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
