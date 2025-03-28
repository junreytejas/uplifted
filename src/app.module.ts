import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestInterceptor } from './modules/common/interceptors/request/request.interceptor';
import { UsersModule } from './modules/internal/users/users.module';
import { AuthModule } from './modules/services/auth/auth.module';
import { FirebaseModule } from './modules/services/firebase/firebase.module';
import { VersionModule } from './modules/system/version/version.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JournalsModule } from './modules/internal/journals/journals.module';

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
    JournalsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
  ],
})
export class AppModule {}
