/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopCarsComponent } from './top-cars.component';

describe('TopCarsComponent', () => {
  let component: TopCarsComponent;
  let fixture: ComponentFixture<TopCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
