import { Controller, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/modules/common/guards/auth/firebase.guard';
import { FirebaseService } from '../firebase/firebase.service';
import { AuthService } from './auth.service';

@UseGuards(FirebaseAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly firebase: FirebaseService,
  ) {}
}
