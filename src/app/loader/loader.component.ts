import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderServiceService } from '../services/loader/loader-service.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {

  loading$!: Observable<boolean>;

  constructor(private loaderService: LoaderServiceService) {}
  
  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$; // Subscribe to loading state
  }
  
}
