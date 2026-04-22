import { Injectable, signal } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs = signal<BreadcrumbItem[]>([]);

  setBreadcrumbs(items: BreadcrumbItem[]) {
    // Luôn thêm "Home" ở đầu
    const withHome: BreadcrumbItem[] = [
      { label: 'Home', url: '/' },
      ...items,
    ];
    this.breadcrumbs.set(withHome);
  }

  addBreadcrumb(item: BreadcrumbItem) {
    const current = this.breadcrumbs();
    this.breadcrumbs.set([...current, item]);
  }

  clear() {
    this.breadcrumbs.set([{ label: 'Home', url: '/' }]);
  }
}
