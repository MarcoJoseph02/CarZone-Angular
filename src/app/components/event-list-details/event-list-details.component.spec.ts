import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListDetailsComponent } from './event-list-details.component';

describe('EventListDetailsComponent', () => {
  let component: EventListDetailsComponent;
  let fixture: ComponentFixture<EventListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
