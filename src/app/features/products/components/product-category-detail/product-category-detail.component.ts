import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductsStore } from '../../store';
import { BreadcrumbService } from '../../../../shared/services';

@Component({
  selector: 'app-product-category-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Back Button -->
        <div class="mb-6">
          <button
            (click)="goBack()"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </button>
        </div>

        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">
            {{ categoryName | titlecase }} Products
          </h1>
          <p class="text-gray-600">{{ categoryProducts().length }} products in this category</p>
        </div>

        @if (categoryProducts().length > 0) {
          <!-- Category Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
              <p class="text-gray-600 text-sm mb-2">Total Products</p>
              <p class="text-3xl font-bold text-blue-600">{{ categoryProducts().length }}</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <p class="text-gray-600 text-sm mb-2">Average Price</p>
              <p class="text-3xl font-bold text-green-600">
                \${{ (calculateAveragePrice() | number: '1.0-0') }}
              </p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <p class="text-gray-600 text-sm mb-2">Total Stock</p>
              <p class="text-3xl font-bold text-purple-600">{{ calculateTotalStock() }}</p>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (product of categoryProducts(); track product.id) {
              <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <img
                  [src]="product.image"
                  [alt]="product.name"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ product.name }}</h3>
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
                  
                  <div class="flex justify-between items-center mb-4">
                    <span class="text-2xl font-bold text-blue-600">\${{ product.price }}</span>
                    <span class="text-sm text-gray-600">Stock: {{ product.stock }}</span>
                  </div>

                  <a
                    [routerLink]="['/products', product.id]"
                    class="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </a>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="bg-white rounded-lg shadow-lg p-8 text-center">
            <p class="text-gray-600 text-lg">No products found in this category</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class ProductCategoryDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  store = inject(ProductsStore);
  breadcrumbService = inject(BreadcrumbService);

  categoryName = '';

  categoryProducts = computed(() => {
    return this.store.products().filter(
      p => p.category.toLowerCase() === this.categoryName.toLowerCase()
    );
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['categoryId'] || '';
      
      this.breadcrumbService.setBreadcrumbs([
        { label: 'Products', url: '/products' },
        { label: 'Categories', url: '/products/categories' },
        { label: this.categoryName, url: `/products/categories/${this.categoryName}` }
      ]);
    });

    this.store.loadProducts().subscribe();
  }

  calculateAveragePrice(): number {
    const products = this.categoryProducts();
    if (products.length === 0) return 0;
    return products.reduce((sum, p) => sum + p.price, 0) / products.length;
  }

  calculateTotalStock(): number {
    return this.categoryProducts().reduce((sum, p) => sum + p.stock, 0);
  }

  goBack(): void {
    this.router.navigate(['/products/categories']);
  }
}
