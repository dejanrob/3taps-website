import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private defaultOptions: SweetAlertOptions = {
    confirmButtonColor: '#23344E', // brand-primary color
    customClass: {
      popup: 'rounded-lg',
      confirmButton: 'rounded-md px-4 py-2'
    }
  };

  constructor() {}

  /**
   * Show a success notification
   */
  success(title: string, message: string): Promise<any> {
    return Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonText: 'U redu',
      ...this.defaultOptions
    });
  }

  /**
   * Show an error notification
   */
  error(title: string, message: string): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonText: 'U redu',
      ...this.defaultOptions
    });
  }

  /**
   * Show a warning notification
   */
  warning(title: string, message: string): Promise<any> {
    return Swal.fire({
      icon: 'warning',
      title,
      text: message,
      confirmButtonText: 'U redu',
      ...this.defaultOptions
    });
  }

  /**
   * Show an info notification
   */
  info(title: string, message: string): Promise<any> {
    return Swal.fire({
      icon: 'info',
      title,
      text: message,
      confirmButtonText: 'U redu',
      ...this.defaultOptions
    });
  }

  /**
   * Show a confirmation dialog
   */
  confirm(title: string, message: string, confirmText = 'Da', cancelText = 'Ne'): Promise<boolean> {
    return new Promise((resolve) => {
      Swal.fire({
        title,
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        ...this.defaultOptions
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  }

  /**
   * Show a custom notification
   */
  custom(options: SweetAlertOptions): Promise<any> {
    return Swal.fire({
      ...this.defaultOptions,
      ...options
    } as any);
  }
} 