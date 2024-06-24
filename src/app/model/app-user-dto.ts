import { AppRoleDto } from './app-role-dto';

export interface AppUserDto {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  appRoles: AppRoleDto[];
}