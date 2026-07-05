export class NotificationResponseDto {
  id: string;
  title: string;
  body: string;
  readAt?: Date | null;
  createdAt: Date;
}
