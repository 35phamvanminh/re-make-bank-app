import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ToastComponent } from './toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
