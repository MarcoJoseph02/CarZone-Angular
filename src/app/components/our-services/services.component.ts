import { Component, OnInit } from '@angular/core';
import { ServiceCardComponent } from '../service-card/service-card.component';
import {
  faCar,
  faFileAlt,
  faCalculator,
  faMoneyBill,
  faSyncAlt,
  faCalendarCheck,
  faBookOpen,
  faSearch,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  imports: [ServiceCardComponent],
})
export class ServicesComponent implements OnInit {
  ourServicesCards = [
    {
      cardTitle: 'Provide a Secure Platform',
      description:
        'Implement secaure payment gateways for transactions and Build trust through verified profiles and secure payment systems.',
      icon: faCar,
    },
    {
      cardTitle: 'Accessibility',
      description: 'Provide a seamless experience for buyers and admins',
      icon: faMoneyBill,
    },
    {
      cardTitle: 'Simplify Search',
      description:
        'Provide advanced search and filtering options for cars and Enable users to find cars by brand, price, year, etc',
      icon: faCalculator,
    },
    {
      cardTitle: 'Secure Authentication',
      description:
        'Implement login, registeration, and role management and Protects user data and ensures proper access control',
      icon: faFileAlt,
    },
    {
      cardTitle: 'Scalability',
      description: 'Provide a smooth experience during peak usage',
      icon: faSyncAlt,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
