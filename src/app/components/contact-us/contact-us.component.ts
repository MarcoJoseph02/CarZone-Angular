import { Component, inject, OnInit } from '@angular/core';
import { MapDisplayComponent } from '../map-display/map-display.component';
import { GoogleMapData } from '../../models/branch';
import { BranchService } from '../../services/branch.service';
import { tap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  imports: [MapDisplayComponent, ReactiveFormsModule],
})
export class ContactUsComponent implements OnInit {
  googleMapData: GoogleMapData[] = [];
  branchServices = inject(BranchService);
  contactService = inject(ContactService);

  fb = inject(FormBuilder);
  emailForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    body: ['', [Validators.required]],
  });
  emailSentNotification = false;
  failToSendNotification = false;
  failedEmailSendingNotification = false;

  constructor() {}

  ngOnInit() {
    this.branchServices
      .getBranches()
      .pipe(
        tap((res) => {
          this.googleMapData = res.data;
        })
      )
      .subscribe();
  }

  sendEmail(): void {
    this.emailSentNotification = false;
    this.failToSendNotification = false;

    if (this.emailForm.valid) {
      this.contactService.sendEmail(this.emailForm.value).subscribe({
        next: () => {
          this.emailSentNotification = true;
          this.emailForm.reset();
        },
        error: () => {
          this.failedEmailSendingNotification = true;
        },
      });
    } else {
      console.error('nameErrors', this.emailForm.controls.name.errors);
      console.error('emailErrors', this.emailForm.controls.email.errors);
      console.error('inquiryErrors', this.emailForm.controls.body.errors);
      this.failToSendNotification = true;
    }
  }
}
