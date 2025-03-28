import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/modules/services/firebase/firebase.service';

@Injectable()
export class UsersService {
  private firestore: FirebaseFirestore.Firestore;
  constructor(private readonly firebase: FirebaseService) {
    this.firestore = this.firebase.getFirestore();
  }

  async create(data: any) {
    const docRef = await this.firestore.collection('users').add(data);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }

  async findAll() {
    const snapshot = await this.firestore.collection('users').get();
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  }

  async findOne(id: string) {
    const doc = await this.firestore.collection('users').doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async update(id: string, data: any) {
    return await this.firestore.collection('users').doc(id).update(data);
  }

  // async remove(id: number) {
  //   return await this.firestore.collection('users').doc(id).delete();
  // }
}
