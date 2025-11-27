import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Category } from '../model/category.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-update-category',
    imports: [FormsModule],
    templateUrl: './update-category.component.html',
    styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit {
  @Input()
  category!: Category;

  @Input()
  isAdd = false;

  @Output()
  categoryUpdated = new EventEmitter<Category>();

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  saveCategory() {
    this.categoryUpdated.emit(this.category);
  }

}
