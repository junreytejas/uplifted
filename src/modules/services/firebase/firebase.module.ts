import { Global, Module } from '@nestjs/common';

import { FirebaseService } from './firebase.service';
import { FirebaseConfigService } from './firebaseConfig.service';

@Global()
@Module({
  providers: [
    FirebaseConfigService, //Use FirebaseConfigService instead of the factory function
    FirebaseService,
  ],
  exports: [FirebaseService, FirebaseConfigService], // Export FirebaseConfigService as well
})
export class FirebaseModule {}
