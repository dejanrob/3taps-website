import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../services/email.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40 backdrop-blur-sm"></div>
    
    <!-- Modal -->
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <div class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-200">
          <!-- Header -->
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-semibold leading-6 text-brand-primary py-4">Kontakt</h3>
              <button 
                (click)="onClose()" 
                class="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Form -->
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ime i Prezime</label>
                <input type="text" formControlName="name" 
                       class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
                       [ngClass]="{'border-red-500 focus:ring-red-500 focus:border-red-500': contactForm.get('name')?.invalid && contactForm.get('name')?.touched}">
                @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                  <p class="mt-1 text-sm text-red-500">Ime je obavezno polje</p>
                }
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" formControlName="email" 
                       class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
                       [ngClass]="{'border-red-500 focus:ring-red-500 focus:border-red-500': contactForm.get('email')?.invalid && contactForm.get('email')?.touched}">
                @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                  <p class="mt-1 text-sm text-red-500">Unesite validnu email adresu</p>
                }
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input type="tel" formControlName="phone" 
                       class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Poruka</label>
                <textarea formControlName="message" rows="4" 
                          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
                          [ngClass]="{'border-red-500 focus:ring-red-500 focus:border-red-500': contactForm.get('message')?.invalid && contactForm.get('message')?.touched}"></textarea>
                @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                  <p class="mt-1 text-sm text-red-500">Poruka je obavezno polje</p>
                }
              </div>
            </form>
          </div>
          
          <!-- Footer -->
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3 justify-between">
            <button type="button" 
                    (click)="onSubmit()"
                    [disabled]="!contactForm.valid || isLoading"
                    class="w-full inline-flex justify-center rounded-lg py-4 px-8 text-sm font-semibold text-white shadow-sm 
                           bg-brand-primary hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200 sm:w-auto">
              <span *ngIf="isLoading" class="mr-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Pošalji
            </button>
            <button type="button" 
                    (click)="onClose()"
                    [disabled]="isLoading"
                    class="mt-3 w-full inline-flex justify-center rounded-lg py-4 px-8 text-sm font-semibold 
                           text-gray-900 bg-white hover:bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 
                           transition-all duration-200 sm:mt-0 sm:w-auto">
              Odustani
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading overlay -->
    @if (isLoading) {
      <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    }
  `
})
export class ContactFormComponent {
  @Output() close = new EventEmitter<void>();
  contactForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private notificationService: NotificationService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.emailService.sendEmail(this.contactForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationService.success(
            'Uspješno!', 
            'Vaša poruka je uspješno poslata. Uskoro ćemo vas kontaktirati.'
          );
          this.onClose();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Email sending failed:', error);
          this.notificationService.error(
            'Greška!', 
            'Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovo.'
          );
        }
      });
    }
  }

  onClose() {
    this.close.emit();
  }
} 