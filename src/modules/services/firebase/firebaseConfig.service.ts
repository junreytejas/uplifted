import { Injectable } from '@nestjs/common';

import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseConfigService {
  private app: admin.app.App;
  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID || 'your-default-project-id',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey:
          process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
      } as admin.ServiceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
  getApp(): admin.app.App {
    return this.app;
  }
}
