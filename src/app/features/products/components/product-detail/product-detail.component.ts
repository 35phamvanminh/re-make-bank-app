import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Product } from '../../models';
import { ProductsService } from '../../services';
import { ProductsStore } from '../../store';
import { ToastService } from '../../../../shared/services';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Back Button -->
        <div class="mb-6">
          <button
            (click)="goBack()"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
        </div>

        @if (product) {
          <!-- Product Detail Card -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <!-- Image -->
              <div>
                <img
                  [src]="product.image"
                  [alt]="product.name"
                  class="w-full h-96 object-cover rounded-lg"
                />
              </div>

              <!-- Details -->
              <div>
                <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
                
                <div class="flex items-center gap-4 mb-4">
                  <span class="text-3xl font-bold text-blue-600">\${{ product.price }}</span>
                  <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                    {{ product.category }}
                  </span>
                </div>

                <p class="text-gray-600 text-lg mb-6">{{ product.description }}</p>

                <!-- Stock Info -->
                <div class="mb-6">
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Stock Information</h3>
                  <div class="bg-gray-100 p-4 rounded-lg">
                    <p class="text-gray-600 mb-2">
                      Available: <span class="font-bold text-gray-900">{{ product.stock }} units</span>
                    </p>
                    <div class="w-full bg-gray-300 rounded-full h-3">
                      <div
                        class="bg-green-500 h-3 rounded-full"
                        [style.width.%]="Math.min((product.stock / 100) * 100, 100)"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Timestamps -->
                <div class="mb-6 space-y-2 text-sm text-gray-600">
                  <p>Created: {{ product.createdAt | date: 'short' }}</p>
                  <p>Updated: {{ product.updatedAt | date: 'short' }}</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4">
                  <button
                    (click)="editProduct()"
                    class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Edit Product
                  </button>
                  <button
                    (click)="deleteProduct()"
                    class="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>

            <!-- Related Info -->
            <div class="bg-gray-50 p-8 border-t">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Additional Information</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white p-4 rounded-lg">
                  <p class="text-gray-600 text-sm">Product ID</p>
                  <p class="font-mono text-sm text-gray-900">{{ product.id }}</p>
                </div>
                <div class="bg-white p-4 rounded-lg">
                  <p class="text-gray-600 text-sm">Category</p>
                  <p class="font-bold text-gray-900">{{ product.category }}</p>
                </div>
                <div class="bg-white p-4 rounded-lg">
                  <p class="text-gray-600 text-sm">Stock Level</p>
                  <p class="font-bold text-gray-900">{{ product.stock }}</p>
                </div>
                <div class="bg-white p-4 rounded-lg">
                  <p class="text-gray-600 text-sm">Price</p>
                  <p class="font-bold text-gray-900">\${{ product.price }}</p>
                </div>
              </div>
            </div>
          </div>
        } @else {
          <div class="bg-white rounded-lg shadow-lg p-8 text-center">
            <p class="text-gray-600 text-lg">Product not found</p>
            <a routerLink="/products" class="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              Go back to products
            </a>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProductsService);
  private store = inject(ProductsStore);
  private toast = inject(ToastService);

  product: Product | null = null;
  Math = Math;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.service.getProductById(id).subscribe(product => {
          this.product = product || null;
          if (!this.product) {
            this.toast.error('Product not found');
          }
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  editProduct(): void {
    this.toast.info('Edit functionality would open a modal');
  }

  deleteProduct(): void {
    if (confirm('Are you sure you want to delete this product?')) {
      if (this.product) {
        this.store.deleteProduct(this.product.id).subscribe({
          next: () => {
            this.toast.success('Product deleted successfully');
            this.router.navigate(['/products']);
          },
          error: () => {
            this.toast.error('Failed to delete product');
          }
        });
      }
    }
  }
}
