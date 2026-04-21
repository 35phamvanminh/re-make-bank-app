import { Injectable, signal, effect } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration = 3000
  ) {
    const id = Date.now().toString();
    const toast: Toast = { id, message, type, duration };

    this.toasts.update((t) => [...t, toast]);

    if (duration) {
      setTimeout(() => this.remove(id), duration);
    }

    return id;
  }

  remove(id: string) {
    this.toasts.update((t) => t.filter((toast) => toast.id !== id));
  }

  success(message: string, duration?: number) {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    return this.show(message, 'error', duration);
  }

  info(message: string, duration?: number) {
    return this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number) {
    return this.show(message, 'warning', duration);
  }
}
