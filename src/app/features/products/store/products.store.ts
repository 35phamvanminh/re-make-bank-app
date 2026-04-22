import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
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
          p.name?.toLowerCase().includes(searchTerm().toLowerCase())
        )
    ),
  })),
  withMethods((store, service = inject(ProductsService)) => ({
    loadProducts() {
      patchState(store, { loading: true, error: null });
      return service.getProducts().pipe(
        tap((products) => {
          console.log(products)
          patchState(store, { products });
        }),
        catchError((error: any) => {
          patchState(store, {
            error: error.message || 'Failed to load products',
          });
          return of([]);
        }),
        finalize(() => {
          patchState(store, { loading: false });
        }),
      );
    },

    createProduct(payload: any) {
      patchState(store, { loading: true, error: null });
      return service.createProduct(payload).pipe(
        tap((product) => {
          patchState(store, (state) => ({
            products: [...state.products, product],
          }));
        }),
        catchError((error: any) => {
          patchState(store, {
            error: error.message || 'Failed to create product',
          });
          throw error;
        }),
        finalize(() => {
          patchState(store, { loading: false });
        }),
      );
    },

    updateProduct(payload: any) {
      patchState(store, { loading: true, error: null });
      return service.updateProduct(payload).pipe(
        tap((updatedProduct) => {
          patchState(store, (state) => ({
            products: state.products.map((p) =>
              p.id === updatedProduct.id ? updatedProduct : p
            ),
          }));
        }),
        catchError((error: any) => {
          patchState(store, {
            error: error.message || 'Failed to update product',
          });
          throw error;
        }),
        finalize(() => {
          patchState(store, { loading: false });
        }),
      );
    },

    deleteProduct(id: string) {
      patchState(store, { loading: true, error: null });
      return service.deleteProduct(id).pipe(
        tap(() => {
          patchState(store, (state) => ({
            products: state.products.filter((p) => p.id !== id),
          }));
        }),
        catchError((error: any) => {
          patchState(store, {
            error: error.message || 'Failed to delete product',
          });
          throw error;
        }),
        finalize(() => {
          patchState(store, { loading: false });
        }),
      );
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
