import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-binding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './binding.component.html',
  styles: ``,
})
export class BindingComponent implements OnInit {
  title: string = 'Demo data binding';
  status: boolean = false;
  name:string='Thierry FOTSO';

  constructor() {}

  ngOnInit(): void {}

  changeTitle(): void {
    this.title = "New title";
  }
}
