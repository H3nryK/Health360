export interface StockAlert {
    id: string;
    medicationId: string;
    medicationName: string;
    type: 'low_stock' | 'expiring' | 'price_change';
    message: string;
    severity: 'high' | 'medium' | 'low';
    createdAt: Date;
    isRead: boolean;
  }
  
  class AlertService {
    private static instance: AlertService;
    private alerts: StockAlert[] = [];
  
    private constructor() {}
  
    static getInstance(): AlertService {
      if (!AlertService.instance) {
        AlertService.instance = new AlertService();
      }
      return AlertService.instance;
    }
  
    checkStockLevels(currentQuantity: number, threshold: number, medicationName: string): void {
      if (currentQuantity <= threshold) {
        this.createAlert({
          id: Date.now().toString(),
          medicationId: '1',
          medicationName,
          type: 'low_stock',
          message: `Low stock alert: ${medicationName} is below threshold`,
          severity: 'high',
          createdAt: new Date(),
          isRead: false
        });
      }
    }
  
    createAlert(alert: StockAlert): void {
      this.alerts.unshift(alert);
    }
  
    getAlerts(): StockAlert[] {
      return this.alerts;
    }
  
    markAsRead(alertId: string): void {
      const alert = this.alerts.find(a => a.id === alertId);
      if (alert) {
        alert.isRead = true;
      }
    }
  }
  
  export default AlertService;
  
  