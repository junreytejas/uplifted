import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from 'src/modules/services/firebase/firebase.service';
import extractTokenFromHeader from '../../helpers/extractTokenFromHeader';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const idToken = extractTokenFromHeader(request);

    if (!idToken) {
      throw new UnauthorizedException();
    }

    try {
      const decodedToken = await this.firebaseService.verifyIdToken(idToken);
      request['user'] = decodedToken;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
