export class USSDService {
  static handleUSSDRequest(text: string) {
    const menu = {
      '': 'Welcome to Health360\n1. Find Pharmacy\n2. Check Insurance\n3. View Prescriptions',
      '1': 'Enter your location code:',
      '2': 'Enter your insurance number:',
      '3': 'Enter your patient ID:'
    };

    return menu[text] || 'Invalid option';
  }
}
