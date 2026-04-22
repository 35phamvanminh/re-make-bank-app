import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../../shared/components';
import { ToastService } from '../../../../shared/services';
import { CreateProductPayload, Product } from '../../models';
import { ProductsStore } from '../../store';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, ProductFormComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  store = inject(ProductsStore);
  toast = inject(ToastService);

  showForm = signal(false);
  isEditing = signal(false);
  editingProduct = signal<Product | null>(null);

  Math = Math;

  ngOnInit(): void {
    this.store.loadProducts().subscribe({
      next: () => {
        this.toast.success('Products loaded successfully!');
      },
      error: () => {
        this.toast.error('Failed to load products');
      },
    }); 
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
