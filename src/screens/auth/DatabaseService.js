import * as SQLite from 'expo-sqlite';

export class DatabaseService {
  static db = SQLite.openDatabase('healthpharma.db');

  static async initDatabase() {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS prescriptions (
            id TEXT PRIMARY KEY,
            medication TEXT,
            dosage TEXT,
            status TEXT
          )`
        );
      }, reject, resolve);
    });
  }

  static async syncData() {
    const offlineData = await this.getOfflineData();
    await this.sendToServer(offlineData);
  }
}
