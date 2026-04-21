import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { CreateProductPayload, Product, UpdateProductPayload } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'MacBook Pro 16"',
      description: 'Powerful laptop for professionals',
      price: 2499,
      category: 'Electronics',
      stock: 25,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'iPhone 15 Pro',
      description: 'Latest Apple smartphone',
      price: 999,
      category: 'Electronics',
      stock: 50,
      image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'AirPods Pro',
      description: 'Wireless earbuds with noise cancellation',
      price: 249,
      category: 'Electronics',
      stock: 100,
      image: 'https://images.unsplash.com/photo-1606841841589-b1762ee19cc8?w=400',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Simulate delay for realistic UX
  getProducts() {
    return of(this.mockProducts).pipe(delay(1000));
  }

  getProductById(id: string) {
    return of(this.mockProducts.find((p) => p.id === id)).pipe(delay(500));
  }

  createProduct(payload: CreateProductPayload) {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.mockProducts.push(newProduct);
    return of(newProduct).pipe(delay(800));
  }

  updateProduct(payload: UpdateProductPayload) {
    const index = this.mockProducts.findIndex((p) => p.id === payload.id);
    if (index !== -1) {
      this.mockProducts[index] = {
        ...this.mockProducts[index],
        ...payload,
        updatedAt: new Date(),
      };
    }
    return of(this.mockProducts[index]).pipe(delay(800));
  }

  deleteProduct(id: string) {
    this.mockProducts = this.mockProducts.filter((p) => p.id !== id);
    return of(null).pipe(delay(600));
  }
}
