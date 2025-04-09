import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EmailRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly apiUrl = environment.brevo.apiUrl;
  private readonly apiKey = environment.brevo.apiKey;
  private readonly sender = environment.brevo.sender;
  private readonly emailTo = environment.brevo.emailTo;

  constructor() {}

  sendEmail(data: EmailRequest): Observable<any> {
    const emailPayload = {
      sender: this.sender,
      to: [{
        email: this.emailTo
      }],
      replyTo: {
        email: data.email,
        name: data.name
      },
      subject: `Nova poruka od ${data.name}`,
      htmlContent: `
        <h2>Nova poruka sa kontakt forme</h2>
        <p><strong>Ime:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ''}
        <p><strong>Poruka:</strong></p>
        <p>${data.message}</p>
      `
    };

    // Using native fetch API instead of HttpClient
    const fetchPromise = fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': this.apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });

    // Convert Promise to Observable
    return from(fetchPromise);
  }
} 