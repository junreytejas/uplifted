import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/internal/users/users.module';
import { AuthModule } from './modules/services/auth/auth.module';
import { FirebaseModule } from './modules/services/firebase/firebase.module';
import { VersionModule } from './modules/system/version/version.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    FirebaseModule,
    UsersModule,
    AuthModule,
    VersionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
