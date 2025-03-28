import { Injectable } from '@nestjs/common';

import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseConfigService {
  private app: admin.app.App;
  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env._FIREBASE_PROJECT_ID,
        clientEmail: process.env._FIREBASE_CLIENT_EMAIL,
        privateKey: process.env._FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      } as admin.ServiceAccount),
      databaseURL: process.env._FIREBASE_DATABASE_URL,
    });
  }
  getApp(): admin.app.App {
    return this.app;
  }
}
