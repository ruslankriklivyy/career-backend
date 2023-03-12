import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

import { Role } from './role.enum';
import { IRequestWithUser } from 'src/types/entities/User';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<IRequestWithUser>();
      const user = request.user;

      return user?.user_role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
