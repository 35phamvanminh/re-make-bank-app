import { Component, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product, CreateProductPayload } from '../../models';
import { ProductsStore } from '../../store';
import { ToastService } from '../../../../shared/services';
import { ProductFormComponent } from '../product-form/product-form.component';
import { LoadingComponent } from '../../../../shared/components';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, ProductFormComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900">Product Management</h1>
          <button
            (click)="openForm()"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            + Add Product
          </button>
        </div>

        <!-- Search -->
        <div class="mb-6">
          <input
            type="text"
            [value]="store.searchTerm()"
            (input)="store.setSearchTerm($event.target.value)"
            placeholder="Search products..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Error Message -->
        @if (store.error()) {
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center"
          >
            <span>{{ store.error() }}</span>
            <button (click)="store.clearError()" class="text-red-700 hover:text-red-900 font-bold">
              ✕
            </button>
          </div>
        }

        <!-- Loading State -->
        @if (store.loading()) {
          <app-loading></app-loading>
        } @else if (store.filteredProducts().length === 0) {
          <div class="text-center py-12">
            <p class="text-gray-500 text-lg">No products found</p>
          </div>
        } @else {
          <!-- Products Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (product of store.filteredProducts(); track product.id) {
              <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                <!-- Image -->
                <img [src]="product.image" [alt]="product.name" class="w-full h-48 object-cover" />

                <!-- Content -->
                <div class="p-4">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{{ product.name }}</h3>
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>

                  <!-- Info -->
                  <div class="flex justify-between items-center mb-4">
                    <span class="text-2xl font-bold text-blue-600">\${{ product.price }}</span>
                    <span
                      class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {{ product.category }}
                    </span>
                  </div>

                  <!-- Stock -->
                  <div class="mb-4">
                    <p class="text-sm text-gray-600">
                      Stock: <span class="font-semibold">{{ product.stock }}</span>
                    </p>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        class="bg-green-500 h-2 rounded-full"
                        [style.width.%]="Math.min((product.stock / 100) * 100, 100)"
                      ></div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex gap-2">
                    <button
                      (click)="editProduct(product)"
                      class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      (click)="deleteProduct(product.id)"
                      class="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>

      <!-- Form Modal -->
      @if (showForm()) {
        <app-product-form
          [product]="editingProduct()"
          [isEdit]="isEditing()"
          (submit)="handleSubmit($event)"
          (cancel)="closeForm()"
        ></app-product-form>
      }
    </div>
  `,
})
export class ProductListComponent {
  store = inject(ProductsStore);
  toast = inject(ToastService);

  showForm = signal(false);
  isEditing = signal(false);
  editingProduct = signal<Product | null>(null);

  Math = Math;

  constructor() {
    effect(
      () => {
        // Load products on component init
        this.store
          .loadProducts()
          .pipe(takeUntilDestroyed())
          .subscribe({
            next: () => {
              this.toast.success('Products loaded successfully!');
            },
            error: () => {
              this.toast.error('Failed to load products');
            },
          });
      },
      { allowSignalWrites: true }
    );
  }

  openForm() {
    this.editingProduct.set(null);
    this.isEditing.set(false);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.editingProduct.set(null);
    this.isEditing.set(false);
  }

  editProduct(product: Product) {
    this.editingProduct.set(product);
    this.isEditing.set(true);
    this.showForm.set(true);
  }

  handleSubmit(payload: CreateProductPayload) {
    if (this.isEditing() && this.editingProduct()) {
      this.store
        .updateProduct({
          id: this.editingProduct()!.id,
          ...payload,
        })
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: () => {
            this.toast.success('Product updated successfully!');
            this.closeForm();
          },
          error: () => {
            this.toast.error('Operation failed. Please try again.');
          },
        });
    } else {
      this.store
        .createProduct(payload)
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: () => {
            this.toast.success('Product created successfully!');
            this.closeForm();
          },
          error: () => {
            this.toast.error('Operation failed. Please try again.');
          },
        });
    }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.store
        .deleteProduct(id)
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: () => {
            this.toast.success('Product deleted successfully!');
          },
          error: () => {
            this.toast.error('Failed to delete product');
          },
        });
    }
  }
}
