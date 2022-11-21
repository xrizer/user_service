export class UserEntity {
  id: string;
  role: string;
  username: string;
  email: string;
  status: string;
  createdBy: string;
  createdAt: any;
  updatedAt: any;
  updatedBy: any;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
