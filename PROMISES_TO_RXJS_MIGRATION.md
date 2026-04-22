# Migration: Promises → RxJS

## Summary

Tất cả code đã được chuyển từ **async/await Promises** sang **RxJS observables**. Đây là cách tiêu chuẩn trong Angular modern.

---

## 📝 Store (products.store.ts)

### ❌ Before (Promises)
```typescript
async loadProducts() {
  patchState(store, { loading: true, error: null });
  try {
    const products = await new Promise<Product[]>((resolve) => {
      service.getProducts()
        .pipe(takeUntilDestroyed())
        .subscribe((data) => resolve(data));
    });
    patchState(store, { products });
  } catch (error: any) {
    patchState(store, { error: error.message || 'Failed to load products' });
  } finally {
    patchState(store, { loading: false });
  }
}
```

### ✅ After (RxJS)
```typescript
loadProducts() {
  patchState(store, { loading: true, error: null });
  return service.getProducts().pipe(
    tap((products) => {
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
    takeUntilDestroyed()
  );
}
```

**Các RxJS operators được dùng:**
- `tap()` - Thực hiện side effects (tương tự code trong try)
- `catchError()` - Bắt lỗi (thay thế catch)
- `finalize()` - Chạy code cuối cùng (thay thế finally)
- `takeUntilDestroyed()` - Tự động unsubscribe khi component bị destroy

---

## 🎯 Component (product-list.component.ts)

### Constructor
```typescript
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
```

**Thay đổi quan trọng:**
- Sử dụng `.subscribe()` thay vì `await`
- `next` callback = thành công
- `error` callback = thất bại
- `allowSignalWrites: true` = cho phép effect cập nhật signals

### Methods

#### Before (async/await)
```typescript
async handleSubmit(payload: CreateProductPayload) {
  try {
    if (this.isEditing() && this.editingProduct()) {
      await this.store.updateProduct({...});
      this.toast.success('Product updated successfully!');
    } else {
      await this.store.createProduct(payload);
      this.toast.success('Product created successfully!');
    }
    this.closeForm();
  } catch (error) {
    this.toast.error('Operation failed. Please try again.');
  }
}
```

#### After (RxJS)
```typescript
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
```

---

## 🔄 So sánh Promises vs RxJS

| Tính năng | Promises | RxJS |
|----------|----------|------|
| **Xử lý single value** | ✅ Tốt | ✅ Tốt |
| **Xử lý multiple values** | ❌ Không thể | ✅ Có thể |
| **Cancel operation** | ❌ Khó | ✅ Dễ (unsubscribe) |
| **Retry logic** | ❌ Manual | ✅ Built-in (retry operator) |
| **Combine operations** | ❌ Phức tạp | ✅ Đơn giản (merge, combineLatest) |
| **Cleanup** | ❌ Manual | ✅ Tự động (takeUntilDestroyed) |

---

## 📚 RxJS Operators Được Dùng

### `tap()`
Side effects - thực hiện hành động nhưng không thay đổi data
```typescript
.pipe(
  tap((data) => console.log('Data:', data)),
  tap(() => patchState(store, { products }))
)
```

### `catchError()`
Xử lý lỗi và trả về alternative observable
```typescript
.pipe(
  catchError((error) => {
    console.error(error);
    return of([]); // Return fallback value
  })
)
```

### `finalize()`
Chạy code cleanup sau khi observable complete hoặc error
```typescript
.pipe(
  finalize(() => {
    patchState(store, { loading: false });
  })
)
```

### `takeUntilDestroyed()`
Tự động unsubscribe khi component destroy
```typescript
.pipe(
  takeUntilDestroyed() // No need to manually unsubscribe
)
```

---

## ✨ Lợi ích

✅ **Reactive** - Code tự động update khi data thay đổi
✅ **Composable** - Dễ kết hợp multiple operations
✅ **Type-safe** - TypeScript support tốt
✅ **Memory-safe** - Tự động cleanup subscription
✅ **Angular Standard** - Cách best practice trong Angular

---

## 🚀 Kết quả

Tất cả CRUD operations bây giờ sử dụng RxJS observables:
- ✅ `loadProducts()` - Load all products
- ✅ `createProduct()` - Thêm product
- ✅ `updateProduct()` - Cập nhật product
- ✅ `deleteProduct()` - Xóa product

Tất cả đều có proper error handling và automatic cleanup!
