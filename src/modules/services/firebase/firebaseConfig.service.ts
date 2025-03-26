import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase-admin.json';

@Injectable()
export class FirebaseConfigService {
  private app: admin.app.App;
  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: 'https://pure-lantern-450601-s8.firebaseio.com',
    });
  }
  getApp(): admin.app.App {
    return this.app;
  }
}
