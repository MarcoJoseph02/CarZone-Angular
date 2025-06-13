import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Signal,
  viewChild,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, UserResetPassword, UserUpdate } from '../../models/user.model';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { tap } from 'rxjs';
import { IComment } from '../../models/comment';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  authService = inject(AuthService);
  loginService = inject(LoginService);
  router = inject(Router);
  fb = inject(FormBuilder);
  commentService = inject(CommentService);
  carService = inject(CarService);

  comments: IComment[] = [];
  cars: Car[] = [];
  user?: User | null;
  editBtnTitle: string = 'Edit Profile';
  editMode: boolean = false;
  isResetPassword: boolean = false;

  profileForm = this.fb.group({
    fname: [this.user?.name.split(' ')[0], [Validators.required]],
    lname: [this.user?.name.split(' ')[1], [Validators.required]],
    email: [this.user?.email, [Validators.required, Validators.email]],
    phone: [this.user?.phone_no, [Validators.required]],
    address: [this.user?.address, [Validators.required]],
  });

  commentsFormGroup = this.fb.group({
    comments: this.fb.array([]),
  });

  get commentsFormArray() {
    return this.commentsFormGroup.get('comments') as FormArray;
  }

  ngOnInit(): void {
    this.getAllComments();
    this.getUserBookedCars();
  }

  getAllComments(): void {
    this.commentService
      .getAllComments()
      .pipe(
        tap((res) => {
          this.user = this.authService.currentUserSig();
          this.initializeProfileForm();
          this.comments = res.data.filter((comment) => {
            return comment.user_id === this.authService.currentUserSig()?.id;
          });
          this.initializeCommentsFormArray();
        })
      )
      .subscribe();
  }

  getUserBookedCars(): void {
    this.carService.getCars().subscribe({
      next: (res) => {
        this.user = this.authService.currentUserSig();
        this.cars = res.data.filter((car) => {
          return car.booking_user?.id === this.authService.currentUserSig()?.id;
        });
      },
    });
  }

  initializeCommentsFormArray() {
    this.comments.forEach((comment) => {
      this.commentsFormArray.push(this.fb.control(comment.body));
    });
  }

  initializeProfileForm() {
    this.profileForm.patchValue({
      fname: this.user?.name.split(' ')[0],
      lname: this.user?.name.split(' ')[1],
      email: this.user?.email,
      phone: this.user?.phone_no,
      address: this.user?.address,
    });
  }

  logout() {
    this.loginService.logout(this.logoutPayload).subscribe();
    localStorage.setItem('token', '');
    localStorage.setItem('id', '');
    this.authService.currentUserSig.set(null);
    this.router.navigateByUrl('/');
  }

  get updateUserPayload(): UserUpdate {
    return {
      fname:
        this.profileForm.value.fname || this.user?.name.split(' ')[0] || '',
      lname:
        this.profileForm.value.lname || this.user?.name.split(' ')[0] || '',
      email: this.profileForm.value.email || this.user?.email || '',
      phone_no: this.profileForm.value.phone || this.user?.phone_no || '',
      address: this.profileForm.value.address || this.user?.address || '',
    };
  }

  editComment(comment: IComment, index: number): void {
    if (comment.isEdit) {
      comment.isEdit = false;
      if (this.user && this.user.id) {
        this.commentService
          .updateComment(comment.id, {
            user_id: this.user.id,
            body: this.commentsFormArray.value[index] || '',
          })
          .subscribe({
            next: () => this.getAllComments(),
            error: () => {
              console.error('Failed to updateComment');
            },
          });
      }
    } else {
      comment.isEdit = true;
    }
  }

  deleteComment(comment: IComment): void {
    this.commentService.deleteComment(comment.id, comment.user_id).subscribe({
      next: () => {
        this.getAllComments();
      },
    });
  }

  toggleEditProfile() {
    this.editMode = !this.editMode;
    this.editBtnTitle = !this.editMode ? 'Edit Profile' : 'Save Changes';
    if (!this.editMode && this.user) {
      const userId = this.user.id;
      this.loginService
        .updateUser(userId, this.updateUserPayload)
        .pipe(
          tap((res) => {
            if (res) {
              this.user = res.data;
              this.initializeProfileForm();
            }
          })
        )
        .subscribe();
    }
  }

  get logoutPayload() {
    return {
      email: this.authService.currentUserSig()?.email || '',
      token: localStorage.getItem('token') || '',
    };
  }
}
