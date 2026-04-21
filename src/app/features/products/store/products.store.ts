import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '../models';
import { ProductsService } from '../services';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  searchTerm: string;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
  searchTerm: '',
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products, searchTerm }) => ({
    filteredProducts: computed(() =>
      products()
        .filter((p) =>
          p.name.toLowerCase().includes(searchTerm().toLowerCase())
        )
    ),
  })),
  withMethods((store, service = inject(ProductsService)) => ({
    async loadProducts() {
      patchState(store, { loading: true, error: null });
      try {
        const products = await new Promise<Product[]>((resolve) => {
          service
            .getProducts()
            .pipe(takeUntilDestroyed())
            .subscribe((data) => resolve(data));
        });
        patchState(store, { products });
      } catch (error: any) {
        patchState(store, { error: error.message || 'Failed to load products' });
      } finally {
        patchState(store, { loading: false });
      }
    },

    async createProduct(payload: any) {
      patchState(store, { loading: true, error: null });
      try {
        const product = await new Promise<Product>((resolve) => {
          service
            .createProduct(payload)
            .pipe(takeUntilDestroyed())
            .subscribe((data) => resolve(data));
        });
        patchState(store, (state) => ({
          products: [...state.products, product],
        }));
        return product;
      } catch (error: any) {
        patchState(store, { error: error.message || 'Failed to create product' });
        throw error;
      } finally {
        patchState(store, { loading: false });
      }
    },

    async updateProduct(payload: any) {
      patchState(store, { loading: true, error: null });
      try {
        const updatedProduct = await new Promise<Product>((resolve) => {
          service
            .updateProduct(payload)
            .pipe(takeUntilDestroyed())
            .subscribe((data) => resolve(data));
        });
        patchState(store, (state) => ({
          products: state.products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          ),
        }));
        return updatedProduct;
      } catch (error: any) {
        patchState(store, { error: error.message || 'Failed to update product' });
        throw error;
      } finally {
        patchState(store, { loading: false });
      }
    },

    async deleteProduct(id: string) {
      patchState(store, { loading: true, error: null });
      try {
        await new Promise<void>((resolve) => {
          service
            .deleteProduct(id)
            .pipe(takeUntilDestroyed())
            .subscribe(() => resolve());
        });
        patchState(store, (state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      } catch (error: any) {
        patchState(store, { error: error.message || 'Failed to delete product' });
        throw error;
      } finally {
        patchState(store, { loading: false });
      }
    },

    setSearchTerm(term: string) {
      patchState(store, { searchTerm: term });
    },

    selectProduct(product: Product | null) {
      patchState(store, { selectedProduct: product });
    },

    clearError() {
      patchState(store, { error: null });
    },
  }))
);
