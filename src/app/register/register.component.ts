import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  error!: string;

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (result) => {
        this.authService.setRegistredUser(this.user);
        alert('veillez confirmer votre email');
        this.router.navigate(['/verifEmail']);
      },
      error: (error: any) => {
        if (error.status == 400) {
          this.error = error.error.message;
        }
      },
    });
  }
}
