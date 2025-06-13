import { Component, Input, OnInit } from '@angular/core';

import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css'],
  imports: [FontAwesomeModule],
})
export class ServiceCardComponent implements OnInit {
  @Input({ required: true }) card!: {
    cardTitle: string;
    description: string;
    icon: IconDefinition;
  };

  constructor() {}

  ngOnInit() {}
}
