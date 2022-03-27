import { User } from '../../shared/models/user.interface';

export class RoleValidator {
  isSuscriptor(user: User): boolean {
    return user.role === 'SUSCRIPTOR';
  }

  isAdmin(user: User): boolean {
    return user.role === 'ADMIN';
  }
}
