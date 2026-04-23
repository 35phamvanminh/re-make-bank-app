import { Injectable, signal } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs = signal<BreadcrumbItem[]>([{ label: 'Home', url: '/' }]);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root, '');
        this.breadcrumbs.set(breadcrumbs);
      });
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', url: '/' }]
  ): BreadcrumbItem[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      
      // If route is dynamic add the actual route to breadcrumbs
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // Add breadcrumb
      const label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      if (label && url) {
        breadcrumbs.push({ label, url });
      }

      // Recursive
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

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
