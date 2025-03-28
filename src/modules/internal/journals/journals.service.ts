import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/modules/services/firebase/firebase.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';

@Injectable()
export class JournalsService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(private readonly firebase: FirebaseService) {
    // Assuming Firebase Admin SDK is initialized
    this.firestore = firebase.getFirestore();
  }
  async createMany(createJournalDtos: CreateJournalDto[]) {
    const batch = this.firestore.batch();

    try {
      createJournalDtos.forEach((createJournalDto) => {
        const {
          title,
          verse,
          scripture,
          reflection,
          discussion,
          custom_content,
        } = createJournalDto;

        const docRef = this.firestore.collection('journals').doc();
        batch.set(docRef, {
          title,
          verse,
          scripture,
          reflection,
          discussion,
          custom_content,
          created_at: new Date().toISOString(), // Human-readable date format
        });
      });

      await batch.commit();
      return {
        message: `${createJournalDtos.length} journals created successfully`,
      };
    } catch (error) {
      console.error('Error creating journals:', error);
      throw new Error('Failed to create journals. Please try again later.');
    }
  }

  async findAll() {
    try {
      const snapshot = await this.firestore.collection('journals').get();
      const journals = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return journals;
    } catch (error) {
      console.error('Error fetching journals:', error);
      throw new Error('Failed to fetch journals. Please try again later.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} journal`;
  }

  update(id: number, updateJournalDto: UpdateJournalDto) {
    return `This action updates a #${id} journal`;
  }

  async remove(id: string) {
    try {
      const docRef = this.firestore.collection('journals').doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        throw new Error(`Journal with ID ${id} does not exist.`);
      }

      await docRef.delete();
      return { message: `Journal with ID ${id} deleted successfully` };
    } catch (error) {
      console.error('Error deleting journal:', error);
      throw new Error('Failed to delete journal. Please try again later.');
    }
  }

  async removeAll() {
    try {
      const snapshot = await this.firestore.collection('journals').get();

      if (snapshot.empty) {
        return { message: 'No journals to delete.' };
      }

      const batch = this.firestore.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      return { message: 'All journals deleted successfully.' };
    } catch (error) {
      console.error('Error deleting all journals:', error);
      throw new Error('Failed to delete all journals. Please try again later.');
    }
  }
}
