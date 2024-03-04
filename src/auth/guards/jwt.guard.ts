import { AuthGuard } from '@nestjs/passport';

//тип гарда jwt
export class JwtAuthGuard extends AuthGuard('jwt') {}
