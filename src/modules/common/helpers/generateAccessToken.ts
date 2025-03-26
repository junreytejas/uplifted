import { JwtService } from '@nestjs/jwt';
export async function generateAccessToken(user: any, jwtService: JwtService) {
  const jwtPayload = {
    id: user.id.toString(),
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    email: user.email,
    image: user.image,
    parent_id: user.parent_id.toString(),
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at,
    is_email_verified: user.remember_token === null,
    information: user.information,
  };

  return {
    access_token: await jwtService.signAsync(jwtPayload),
    user: jwtPayload,
  };
}
