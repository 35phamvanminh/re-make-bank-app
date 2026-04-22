import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-white px-4 py-3 border-b border-gray-200" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 max-w-7xl mx-auto">
        @for (item of breadcrumbService.breadcrumbs(); let last = $last; let idx = $index; track idx) {
          <li class="flex items-center">
            @if (idx > 0) {
              <span class="text-gray-400 mx-2">/</span>
            }
            @if (last) {
              <span class="text-gray-900 font-medium">{{ item.label }}</span>
            } @else {
              <a
                [routerLink]="item.url"
                class="text-blue-600 hover:text-blue-800 hover:underline transition"
              >
                {{ item.label }}
              </a>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [],
})
export class BreadcrumbComponent {
  breadcrumbService = inject(BreadcrumbService);
}
