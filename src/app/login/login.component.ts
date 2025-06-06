import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user = new User();
  error = 0;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        console.log('response:', data);
        const jwtToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwtToken);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        this.error = 1;
      },
    });
  }
}
