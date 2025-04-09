export const environment = {
  production: false,
  brevo: {
    apiUrl: 'https://api.brevo.com/v3/smtp/email',
    apiKey: '',
    sender: {
      name: '3Taps Contact Form',
      email: 'placid.dr@gmail.com'
    },
    emailTo: 'info@3taps.me'
  }
}; 