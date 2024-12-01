export class PaymentService {
    static async processPayment(orderDetails) {
      try {
        const paymentIntent = await this.createPaymentIntent(orderDetails);
        const paymentResult = await this.confirmPayment(paymentIntent);
        
        if (paymentResult.success) {
          await this.updateOrderStatus(orderDetails.id, 'paid');
        }
        
        return paymentResult;
      } catch (error) {
        console.error('Payment processing failed:', error);
        throw error;
      }
    }
  }
  