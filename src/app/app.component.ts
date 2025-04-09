import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ContactFormComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showContactForm = false;

  toggleContactForm() {
    this.showContactForm = !this.showContactForm;
  }
}
