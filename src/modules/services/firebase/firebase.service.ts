import { Injectable, UnauthorizedException } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { FirebaseConfigService } from './firebaseConfig.service';

@Injectable()
export class FirebaseService {
  private firestore: FirebaseFirestore.Firestore;
  constructor(private firebaseConfigService: FirebaseConfigService) {
    this.initFirestore();
  }

  private initFirestore() {
    this.firestore = this.firebaseConfigService.getApp().firestore();
    this.firestore.settings({
      ignoreUndefinedProperties: true, // Enable this setting
    });
  }
  async verifyIdToken(idToken: string): Promise<auth.DecodedIdToken> {
    try {
      const decodedToken = await this.firebaseConfigService
        .getApp()
        .auth()
        .verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  // Example method using Firebase
  getFirestore() {
    return this.firestore;
  }
}
