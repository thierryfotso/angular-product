import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user = new User();
  errorMessage?: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        const jwtToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwtToken);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        if (error.error?.errorCode) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'login et/ou mot de passe erronés...';
        }
        console.log('login error:', error);
      },
    });
  }
}
