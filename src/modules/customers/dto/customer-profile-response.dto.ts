export class CustomerProfileResponseDto {
  id: string;
  userId: string;
  name?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
