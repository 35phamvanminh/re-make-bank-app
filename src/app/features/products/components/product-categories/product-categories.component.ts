import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsStore } from '../../store';
import { BreadcrumbService } from '../../../../shared/services';

interface CategoryGroup {
  category: string;
  count: number;
  productIds: string[];
}

@Component({
  selector: 'app-product-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Product Categories</h1>
          <p class="text-gray-600">Browse products organized by category</p>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (categoryGroup of categoryGroups(); track categoryGroup.category) {
            <div
              class="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
            >
              <div
                class="bg-gradient-to-br from-blue-400 to-blue-600 h-24 flex items-center justify-center"
              >
                <div class="text-white text-center">
                  <p class="text-4xl font-bold">{{ categoryGroup.count }}</p>
                  <p class="text-sm opacity-90">products</p>
                </div>
              </div>
              
              <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ categoryGroup.category }}</h2>
                
                <a
                  [routerLink]="['/products/categories', categoryGroup.category.toLowerCase()]"
                  class="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  View Products →
                </a>
              </div>
            </div>
          }
        </div>

        <!-- Empty State -->
        @if (categoryGroups().length === 0) {
          <div class="text-center py-12">
            <p class="text-gray-500 text-lg">No categories found</p>
          </div>
        }

        <!-- Stats Section -->
        <div class="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Category Statistics</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <p class="text-4xl font-bold text-blue-600">{{ categoryGroups().length }}</p>
              <p class="text-gray-600">Total Categories</p>
            </div>
            <div class="text-center">
              <p class="text-4xl font-bold text-green-600">{{ store.products().length }}</p>
              <p class="text-gray-600">Total Products</p>
            </div>
            <div class="text-center">
              <p class="text-4xl font-bold text-purple-600">
                \${{ calculateTotalValue() | number: '1.0-0' }}
              </p>
              <p class="text-gray-600">Inventory Value</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductCategoriesComponent implements OnInit {
  store = inject(ProductsStore);
  breadcrumbService = inject(BreadcrumbService);

  categoryGroups = computed(() => {
    const products = this.store.products();
    const grouped = new Map<string, string[]>();

    products.forEach(product => {
      if (!grouped.has(product.category)) {
        grouped.set(product.category, []);
      }
      grouped.get(product.category)?.push(product.id);
    });

    return Array.from(grouped.entries()).map(([category, productIds]) => ({
      category,
      count: productIds.length,
      productIds
    }));
  });

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Products', url: '/products' },
      { label: 'Categories', url: '/products/categories' }
    ]);
    
    this.store.loadProducts().subscribe();
  }

  calculateTotalValue(): number {
    return this.store.products().reduce((sum, product) => sum + product.price * product.stock, 0);
  }
}
