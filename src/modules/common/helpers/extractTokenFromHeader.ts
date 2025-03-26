import { UnauthorizedException } from '@nestjs/common';

export default function extractTokenFromHeader(
  request: Request,
): string | undefined {
  if (!request.headers['authorization']) {
    throw new UnauthorizedException();
  }
  const [type, token] = request.headers['authorization']?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
